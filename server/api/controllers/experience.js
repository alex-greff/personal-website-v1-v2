const mongoose = require("mongoose");
const Experience = require("../models/experience");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "title company companyLink summary tags _id startDate endDate";

const UNEDITABLE_FIELDS = ["_id", "updated"];

// Object filters
const EXPERIENCE_ITEM_FIELDS = ["_id", "title", "company", "companyLink", "summary", "tags", "startDate", "endDate"];

exports.experience_get_all = async (req, res, next) => {
    try {
        const docs = await Experience.find().select(SELECTED_FIELDS).exec();

        const url = `${Utilities.getURLBase(req)}/${doc._id}`;

        console.log("FROM DATABASE\n", docs);

        // Send response
        res.status(200).json({
            count: docs.length,
            experience: docs.map(doc => {
                return {
                    ...Utilities.filterByKeys(doc, ...EXPERIENCE_ITEM_FIELDS),
                    request: {
                        type: "GET",
                        url: url
                    }
                }
            })
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.experience_create_experience = async (req, res, next) => {
    try {
        // Create experience doc
        const experience = new Experience({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            company: req.body.company,
            companyLink: req.body.companyLink,
            summary: req.body.summary,
            tags: req.body.tags,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        const result = await experience.save();

        console.log("CREATED EXPERIENCE ITEM\n", result);

        const url = `${Utilities.getURLBase(req)}/${result._id}`;

        // Send response
        res.status(201).json({
            message: "Created experience item successfully",
            createdExperience: {
                ...Utilities.filterByKeys(result, ...EXPERIENCE_ITEM_FIELDS),
                request: {
                    type: "GET",
                    url: url
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

        console.log("UPDATE OPS\n", updateOps);

        const result = await Experience.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec();

        const url = `${Utilities.getURLBase(req)}/${id}`;

        if (!result || result.nModified < 1) {
            return res.status(404).json({
                message: "Unable to find and update experience item"
            });
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

        // Send response
        const url = Utilities.getURLBase(req);
        res.status(200).json({
            message: "Experience item deleted",
            request: {
                type: "POST",
                url: url,
                body: {
                    title: "String",
                    company: "String",
                    companyLink: "String",
                    summary: "String",
                    tags: "Array of Strings",
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