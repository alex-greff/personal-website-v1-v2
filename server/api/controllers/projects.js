const mongoose = require("mongoose");
const Project = require("../models/project");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "name summary description _id thumbnailImage galleryImages links tags startDate endDate";

exports.projects_get_all = async (req, res, next) => {
    try {
        const docs = await Project.find().select(SELECTED_FIELDS).exec();

        const urlBase = Utilities.getURLBase(req);

        console.log("FROM DATABASE\n", docs);

        // Construct response
        const response = {
            count: docs.length,
            projects: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    summary: doc.summary,
                    description: doc.description,
                    thumbnailImage: doc.thumbnailImage,
                    galleryImages: doc.galleryImages,
                    links: doc.links,
                    tags: doc.tags,
                    startDate: doc.startDate,
                    endDate: doc.endDate,
                    request: {
                        type: "GET",
                        url: `${urlBase}/${doc._id}`
                    }
                };
            })
        };

        // Send response
        res.status(200).json(response);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.projects_create_project = async (req, res, next) => {
    // Construct thumbnail image path entry
    let thumbnailImagePath;
    if (req.files['thumbnailImage']) {
        thumbnailImagePath = Utilities.sanitizeImagePath(req.files["thumbnailImage"][0].path);
    }
    
    // Construct gallery images object
    let galleryImagesPaths = {};
    if (req.files['galleryImages']) {
        req.files['galleryImages'].forEach(galleryImage => {
            const id = new mongoose.Types.ObjectId();
            galleryImagesPaths[id] = Utilities.sanitizeImagePath(galleryImage.path);
        });
    }

    // Create project mongodb doc
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        summary: req.body.summary,
        description: req.body.description,

        thumbnailImage: thumbnailImagePath,
        galleryImages: galleryImagesPaths,

        links: req.body.links,
        tags: req.body.tags,

        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    try {
        const result = await project.save();

        console.log("CREATED PROJECT\n", result);

        const url = `${Utilities.getURLBase(req)}/${result._id}`;

        // Send response
        res.status(201).json({
            message: "Created project successfully",
            createdProject: {
                // TODO: don't hardcode this
                _id: result._id,
                name: result.name,
                summary: result.summary,
                description: result.description,
                thumbnailImage: result.thumbnailImage,
                galleryImages: result.galleryImages,
                links: result.links,
                tags: result.tags,
                startDate: result.startDate,
                endDate: result.endDate,
                request: {
                    type: "GET",
                    url: url
                }
            }
        });

    } catch (err) {
        console.log(err);

        // Delete uploaded files
        Utilities.deleteUploadedFiles(req);

        res.status(500).json({
            error: err
        });
    }
};

exports.projects_get_project = async (req, res, next) => { 
    const id = req.params.projectID;

    try {
        // Get specific project
        const doc = await Project.findById(id).select(SELECTED_FIELDS).exec();

        console.log("FROM DATABASE\n", doc);

        if (doc) { // If document is found
            const url = Utilities.getURLBase(req);

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

    } catch(err) {
        console.log(err);

        res.status(500).json({
            error: err
        });
    }
};

exports.projects_update_project = async (req, res, next) => { 
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
    if (!!req.files && !!req.files['thumbnailImage']) {
        updateOps['thumbnailImage'] = Utilities.sanitizeImagePath(req.files['thumbnailImage'][0].path);
    }

    // Construct the list of gallery image paths to be added
    let addGalleryImages = [];
    if (!!req.files && !!req.files['galleryImages']) {
        req.files['galleryImages'].forEach(galleryImage => {
            addGalleryImages.push(Utilities.sanitizeImagePath(galleryImage.path));
        });
    }

    try {   
        const doc = await Project.findById(id).select(SELECTED_FIELDS).exec();

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
                    } else {
                        throw `Error unable to remove gallery image with ID '${imageID}'. Image not found`;
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

        const result = await Project.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec();

        const url = `${Utilities.getURLBase(req)}/${id}`;

        // TODO: this is a really ugly way of detecting if the file does not exist... is there a better way?
        // If no project is found
        if (result.n < 1) {
            throw "Project not found";
        }

        // Send response
        res.status(200).json({
            message: "Project updated",
            request: {
                type: "GET",
                url: url
            }
        });

    } catch(err) {
        console.log(err);

        // Delete uploaded files
        Utilities.deleteUploadedFiles(req);

        res.status(500).json({
            error: err
        });
    }
};

exports.projects_delete_project = async (req, res, next) => { 
    const id = req.params.projectID;
    
    try {
        const removed = await Project.findOneAndRemove({ _id: id }).exec();

        if (!removed) {
            throw "Unable to remove project";
        }

        console.log("REMOVED\n", removed);

        // Clean up thumbnail image
        Utilities.cleanupFile(removed.thumbnailImage);

        // Clean up gallery images, if needed
        if (removed.galleryImages) {
            removed.galleryImages.forEach((galleryImage) => {
                Utilities.cleanupFile(galleryImage);
            });
        };

        // Send response
        const url = Utilities.getURLBase(req);
        res.status(200).json({
            message: "Project deleted",
            request: {
                type: "POST",
                url: url,
                body: {
                    // TODO: don't hardcode this
                    name: "String",
                    summary: "String",
                    description: "String",
                    thumbnailImage: "image/JPEG or image/PNG",
                    galleryImages: "Array of image/JPEG or image/PNG",
                    links: "Map of String",
                    tags: "Array of String",
                    startDate: "Date",
                    endDate: "Date",
                }
            }
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
