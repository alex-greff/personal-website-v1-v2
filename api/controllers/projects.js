const mongoose = require("mongoose");
const Project = require("../models/project");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "name description _id thumbnailImage galleryImages links tags startDate endDate";

exports.projects_get_all = (req, res, next) => {
    Project.find()
        .select(SELECTED_FIELDS)
        .exec()
        .then(docs => {
            let urlBase = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

            console.log("FROM DATABASE\n", docs);

            // Construct response
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        thumbnailImage: doc.thumbnailImage,
                        galleryImages: doc.galleryImages,
                        links: doc.links,
                        tags: doc.tags,
                        startDate: doc.startDate,
                        endDate: doc.endDate,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: `${urlBase}/${doc._id}`
                        }
                    };
                })
            };
            // Send response
            res.status(200).json(response);

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.projects_create_project = (req, res, next) => {
    // Construct thumbnail image path entry
    let thumbnailImagePath;
    if (req.files['thumbnailImage']) {
        thumbnailImagePath = req.files['thumbnailImage'][0].path;
    }
    
    // Construct gallery images object
    let galleryImagesPaths = {};
    if (req.files['galleryImages']) {
        req.files['galleryImages'].forEach(galleryImage => {
            galleryImagesPaths[new mongoose.Types.ObjectId()] = galleryImage.path;
        });
    }

    // Create project mongodb doc
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,

        thumbnailImage: thumbnailImagePath,
        galleryImages: galleryImagesPaths,

        links: req.body.links,
        tags: req.body.tags,

        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    project
        .save()
        .then(result => {
            console.log("CREATED PROJECT\n", result);

            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${result._id}`;
            // Send response
            res.status(201).json({
                message: "Created project successfully",
                createdProject: {
                    // TODO: don't hardcode this
                    name: result.name,
                    description: result.description,
                    thumbnailImage: result.thumbnailImage,
                    galleryImages: result.galleryImages,
                    links: result.links,
                    tags: result.tags,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: url
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);

            // Delete uploaded files
            const fields = Object.entries(req.files);
            // Iterate through each field
            fields.forEach(([field, files])=> {
                // Iterate through the files in the current field
                files.forEach(file => {
                    // Remove each file
                    Utilities.cleanupFile(file.path);
                });
            });

            res.status(500).json({
                error: err
            });
        });
};

exports.projects_get_project = (req, res, next) => { 
    const id = req.params.projectID;

    // Get specific project
    Project.findById(id)
        .select(SELECTED_FIELDS)
        .exec()
        .then(doc => {
            console.log("FROM DATABASE\n", doc);

            if (doc) { // If document is found
                let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
                // Send response
                res.status(200).json({
                    project: doc,
                    request: {
                        type: "GET",
                        url: url
                    }
                });
            } else { // If not found
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            });
        });
};

exports.projects_update_project = (req, res, next) => { 
    const id = req.params.projectID;

    // Construct update operations object
    const updateOps = {};

    let removeGalleryImagesIDs = [];
    Object.entries(req.body).forEach(([field, newValue]) => {
        // Manually handle the removeGalleryImages operation
        if (field === "removeGalleryImages") {
            // Construct the list of gallery image IDs to be removed
            removeGalleryImagesIDs = (typeof newValue === 'string') ? [ newValue ] : newValue;
            return;
        }

        // Add in the current regular operation 
        updateOps[field] = newValue;
    });

    // If the thumbnail image is being updated then add it to the update ops
    if (req.files['thumbnailImage']) {
        updateOps['thumbnailImage'] = req.files['thumbnailImage'][0].path;
    }

    // Construct the list of gallery image paths to be added
    let addGalleryImages = [];
    if (req.files['galleryImages']) {
        req.files['galleryImages'].forEach(galleryImage => {
            addGalleryImages.push(galleryImage.path);
        });
    }
    
    // TODO: this is pretty ugly, it should be cleaned up
    Project.findById(id)
    .select(SELECTED_FIELDS)
    .exec()
    .then(doc => {
        if (doc) { // If document is found
            // Cleanup the thumbnail image, if needed
            if (!!doc.thumbnailImage && !!updateOps['thumbnailImage']) {
                Utilities.cleanupFile(doc.thumbnailImage);
            }


            if (doc.galleryImages) {
                // Construct the base updated gallery images map
                const updatedGalleryImages = {};
                doc.galleryImages.forEach((path, imageID) => {
                    updatedGalleryImages[imageID] = path;
                });

                // Remove out the gallery images that are listed for removal
                removeGalleryImagesIDs.forEach(imageID => {
                    if (doc.galleryImages.get(imageID)) {
                        // Cleanup the image
                        Utilities.cleanupFile(doc.galleryImages.get(imageID));
                    }

                    // Remove the entry
                    delete updatedGalleryImages[imageID];
                });

                // Add in the gallery images that are listed for addition
                addGalleryImages.forEach(imagePath => {
                    updatedGalleryImages[new mongoose.Types.ObjectId()] = imagePath;
                });

                // Add the updated gallery images map to the update ops
                updateOps['galleryImages'] = updatedGalleryImages;
            }
        }

        console.log("UPDATE OPS\n", updateOps);

        // TODO: nested async functions... fix this using async await or something
        Project
            .updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }) // Update document
            .exec()
            .then(result => {
                let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${id}`;

                // TODO: this is a really ugly way of detecting if the file does not exist... is there a better way?
                // If no project is found
                if (result.n < 1) {
                    const err = "Project not found"

                    // TODO: duplicated code here... fix this

                    // Delete uploaded files
                    const fields = Object.entries(req.files);
                    // Iterate through each field
                    fields.forEach(([field, files])=> {
                        // Iterate through the files in the current field
                        files.forEach(file => {
                            // Remove each file
                            Utilities.cleanupFile(file.path);
                        });
                    });

                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }

                // Send response
                res.status(200).json({
                    message: "Project updated",
                    request: {
                        type: "GET",
                        url: url
                    }
                });
            })
            .catch(err => {
                // Delete uploaded files
                const fields = Object.entries(req.files);
                // Iterate through each field
                fields.forEach(([field, files])=> {
                    // Iterate through the files in the current field
                    files.forEach(file => {
                        // Remove each file
                        Utilities.cleanupFile(file.path);
                    });
                });

                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    })
    .catch(); // Do nothing
};

exports.projects_delete_project = (req, res, next) => { 
    const id = req.params.projectID;
    
    Project
        .findOneAndRemove({ _id: id })
        .exec()
        .then(removed => {
            console.log("Removed", removed);

            // Clean up thumbnail image
            Utilities.cleanupFile(removed.thumbnailImage);

            // Clean up gallery images, if needed
            if (removed.galleryImages) {
                removed.galleryImages.forEach((galleryImage) => {
                    Utilities.cleanupFile(galleryImage);
                });
            };

            // Send response
            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
            res.status(200).json({
                message: "Project deleted",
                request: {
                    type: "POST",
                    url: url,
                    body: {
                        // TODO: don't hardcode this
                        name: "String",
                        description: "String",
                        thumbnailImage: "image/JPEG or image/PNG",
                        galleryImages: "Array of image/JPEG or image/PNG",
                        links: "String Map of String",
                        tags: "Array of String",
                        startDate: "Date",
                        endDate: "Date",
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
