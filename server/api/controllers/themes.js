const mongoose = require('mongoose');
const Theme = require('../models/theme');
const Utilities = require('../utilities');
const THEME_ITEMS = require('../constants/themeItems');

const UNREMOVEABLE_DOC_IDS = require('../constants/unremovableDocs');
const UNEDITABLE_FIELDS = ["_id"];

exports.themes_get_all = async (req, res, next) => {
    try {
        const docs = await Theme.find().exec();

        let urlBase = `${Utilities.getURLBase(req)}`;

        // Construct response
        const response = {
            count: docs.length,
            themes: docs.map(doc => {
                const theme_BASE = doc["BASE"];
                const theme_subSections = doc["subSections"];

                return {
                    name: doc.name,
                    baseTheme: doc.baseTheme,
                    BASE: {
                        ...theme_BASE
                    },
                    subSections: {
                        ...theme_subSections
                    },
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

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.themes_get_theme = async (req, res, next) => {
    const id = req.params.themeID;

    try {
        // Get specific theme
        const doc = await Theme.findById(id).exec();

        console.log("From database", doc);

        if (doc) {
            // Get the template of the theme
            const theme_BASE = doc["BASE"];
            const theme_subSections = doc["subSections"];

            let url = `${Utilities.getURLBase(req)}`;

            // Send response
            res.status(200).json({
                theme: {
                    _id: doc._id,
                    name: doc.name,
                    baseTheme: doc.baseTheme,
                    BASE: {
                        ...theme_BASE
                    },
                    subSections: {
                        ...theme_subSections
                    }
                }, 
                request: {
                    type: "GET",
                    url: url
                }
            });
        } else {
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

exports.themes_create_theme = async (req, res, next) => {
    const theme_BASE = req.body["BASE"];
    const theme_subSections = req.body["subSections"];

    // Create theme mongodb doc
    const theme = new Theme({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        BASE: theme_BASE,
        subSections: theme_subSections
    });

    try {
        const result = await theme.save();

        console.log(result);

        const theme_BASE = result["BASE"];
        const theme_subSections = result["subSections"];

        let url = `${Utilities.getURLBase(req)}/${result._id}`
        // Send response 
        res.status(201).json({
            message: "Created theme sucessfully",
            createdTheme: {
                name: result.name,
                baseTheme: result.baseTheme,
                BASE: {
                    ...theme_BASE
                },
                subSections: {
                    ...theme_subSections
                },
                _id: result._id,
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

exports.themes_update_theme = async (req, res, next) => {
    const id = req.params.themeID;
    
    try {
        // Construct update operations object
        const updateOps = {};
        Object.entries(req.body).forEach(([field, newValue]) => {
            if (UNEDITABLE_FIELDS.includes(field)) {
                throw `Uneditable field: ${field}`;
            }

            updateOps[field] = newValue;
        });

        const result = await Theme.updateOne({ _id: id}, { $set: updateOps }, { runValidators: true }).exec(); // Update document

        if (!result || result.nModified < 1) {
            throw "Unable to update theme";
        }

        let url = `${Utilities.getURLBase(req)}/${id}`;
        
        // Send response
        res.status(200).json({
            message: "Theme updated",
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

exports.themes_delete_theme = async (req, res, next) => {
    const id = req.params.themeID;

    // If the user tries removing an unremovable doc
    if (UNREMOVEABLE_DOC_IDS.includes(id)) {
        return res.status(403).json({
            error: "Forbidden to remove document"
        });
    }

    try {
        const removed = await Theme.findByIdAndRemove({ _id: id }).exec();

        let url = `${Utilities.getURLBase(req)}`;
        // Send response
        res.status(200).json({
            message: "Theme deleted",
            request: {
                type: "POST",
                url: url,
                body: {
                    name: "String",
                    BASE: "Object of Objects",
                    subSections: "Object of Objects"
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