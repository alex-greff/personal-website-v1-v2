const mongoose = require("mongoose");
const Experience = require("../models/experience");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "title company companyLink summary tags _id thumbnailImage startDate endDate";

exports.experience_get_all = async (req, res, next) => {
    try {
        const docs = await Experience.find().select(SELECTED_FIELDS).exec();

        const urlBase = Utilities.getURLBase(req);

        console.log("FROM DATABASE\n", docs);

        // Construct response
        const response = {
            count: docs.length,
            experience: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    company: doc.company,
                    companyLink: doc.companyLink,
                    summary: doc.summary,
                    tags: doc.tags,
                    thumbnailImage: doc.thumbnailImage, 
                    startDate: doc.startDate,
                    endDate: doc.endDate,
                    request: {
                        type: "GET",
                        url: `${urlBase}/${doc._id}`
                    }
                }
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

exports.experience_create_experience = async (req, res, next) => {
    // Construct thumbnail image path entry
    let thumbnailImagePath;
    if (req.files['thumbnailImage']) {
        thumbnailImagePath = Utilities.sanitizeImagePath(req.files['thumbnailImage'][0].path);
    }

    // Create experience doc
    const experience = new Experience({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        company: req.body.company,
        companyLink: req.body.companyLink,
        summary: req.body.summary,
        tags: req.body.tags,
        thumbnailImage: thumbnailImagePath,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    try {
        const result = await experience.save();

        console.log("CREATED EXPERIENCE ITEM\n", result);

        const url = `${Utilities.getURLBase(req)}/${result._id}`;

        // Send response
        res.status(201).json({
            message: "Created experience item successfully",
            createdExperience: {
                _id: result._id,
                title: result.title,
                company: result.company,
                companyLink: result.companyLink,
                summary: result.summary,
                tags: result.tags,
                thumbnailImage: result.thumbnailImage,
                startDate: result.startDate,
                endDate: result.endDate,
                request: {
                    type: "GET",
                    url: url
                }
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

exports.experience_get_experience = async (req, res, next) => {
    const id = req.params.experienceID;

    try {
        // Get specific doc
        const doc = await Experience.findById(id).select(SELECTED_FIELDS).exec();

        console.log("FROM DATABASE\n", doc);

        if (doc) { // If document found
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

exports.experience_update_experience = async (req, res, next) => {
    const id = req.params.projectID;

    // Construct update operations object
    const updateOps = {}; 
    Object.entries(req.body).forEach(([field, newValue]) => {
        // Add in the current regular operation 
        updateOps[field] = newValue;
    });

    // If the thumbnail image is being updated then add it to the update ops
    if (!!req.files && !!req.files['thumbnailImage']) {
        updateOps['thumbnailImage'] = req.files['thumbnailImage'][0].path;
    }

    try {
        const doc = await Experience.findById(id).select(SELECTED_FIELDS).exec();

        if (doc) { // If doc found
            // Cleanup the thumbnail image, if needed
            if (!!doc.thumbnailImage && !!updateOps['thumbnailImage']) {
                Utilities.cleanupFile(doc.thumbnailImage);
            }
        }

        console.log("UPDATE OPS\n", updateOps);

        const result = await Experience.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec();

        const url = `${Utilities.getURLBase(req)}/${id}`;

        // TODO: this is a really ugly way of detecting if the file does not exist... is there a better way?
        // If no experience is found
        if (result.n < 1) {
            throw "Experience item not found";
        }

        // Send response
        res.status(200).json({
            message: "Experience item updated",
            request: {
                type: "GET",
                url: url
            }
        });

    } catch(err) {
        // Delete uploaded files
        Utilities.deleteUploadedFiles(req);

        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.experience_delete_experience = async (req, res, next) => {
    const id = req.params.experienceID;

    try {
        const removed = await Experience.findOneAndRemove({ _id: id }).exec();

        if (!removed) {
            throw "Unable to remove experience";
        }

        console.log("REMOVED\n", removed);

        // Cleanup thumbnail image
        Utilities.cleanupFile(removed.thumbnailImage);

        // Send response
        const url = Utilities.getURLBase(req);
        res.status(200).json({
            message: "Experience item deleted",
            request: {
                type: "POST",
                url: url,
                body: {
                    // TODO: don't hardcode this
                    title: "String",
                    company: "String",
                    companyLink: "String",
                    summary: "String",
                    tags: "Array of Strings",
                    thumbnailImage: "image/JPEG or image/PNG",
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