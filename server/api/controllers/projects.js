const mongoose = require("mongoose");
const Project = require("../models/project");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "name summary description _id thumbnailImage galleryImages links tags startDate endDate";
const UNEDITABLE_FIELDS = ["_id", "updated"];

// Object filters
const PROJECT_ITEM_FIELDS = ["_id", "name", "summary", "description", "thumbnailImage", "galleryImages", "links", "tags", "startDate", "endDate"];

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
                    ...Utilities.filterByKeys(doc, ...PROJECT_ITEM_FIELDS),
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
    try {
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

        const result = await project.save();

        console.log("CREATED PROJECT\n", result);

        const url = `${Utilities.getURLBase(req)}/${result._id}`;

        // Send response
        res.status(201).json({
            message: "Created project successfully",
            createdProject: {
                ...Utilities.filterByKeys(result, ...PROJECT_ITEM_FIELDS),
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

    try {   
        // Construct update operations object
        const updateOps = {};

        Object.entries(req.body).forEach(([field, newValue]) => {
            if (UNEDITABLE_FIELDS.includes(field)) {
                throw `Uneditable field: ${field}`;
            }

            // Add in the current regular operation 
            updateOps[field] = newValue;
        });

        updateOps["updated"] = Date.now();

        // If the thumbnail image is being updated then add it to the update ops
        if (!!req.files && !!req.files['thumbnailImage']) {
            updateOps['thumbnailImage'] = Utilities.sanitizeImagePath(req.files['thumbnailImage'][0].path);
        }

        // Construct the new gallery images list
        if (req.files && req.files['galleryImages']) {
            req.files['galleryImages'].forEach(galleryImage => {
                // Initialize gallery images update ops if it hasn't been already
                if (!updateOps['galleryImages']) {
                    updateOps['galleryImages'] = {};
                }

                updateOps['galleryImages'][new mongoose.Types.ObjectId()] = galleryImage.path;
            });
        }
    
        const doc = await Project.findById(id).select(SELECTED_FIELDS).exec();

        if (doc) { // If document is found
            // Cleanup the thumbnail image, if needed
            if (!!doc.thumbnailImage && !!updateOps['thumbnailImage']) {
                Utilities.cleanupFile(doc.thumbnailImage);
            }

            // Clear the old gallery images, if needed
            if (updateOps['galleryImages']) {
                doc.galleryImages.forEach((imagePath) => {
                    Utilities.cleanupFile(imagePath); // Cleanup the image
                });
            }
        }

        console.log("UPDATE OPS\n", updateOps);

        const result = await Project.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec();

        const url = `${Utilities.getURLBase(req)}/${id}`;

        // If no documents were modified
        if (!result || result.nModified < 1) {
            throw "Unabled to update project";
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

        console.log("REMOVED PROJECT\n", removed);

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
