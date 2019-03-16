const mongoose = require('mongoose');
const Theme = require('../models/theme');
const Utilities = require('../utilities');
const THEME_ITEMS = require('../constants/themeItems');

const UNREMOVEABLE_DOC_IDS = require('../constants/unremovableDocs');

exports.themes_get_all = (req, res, next) => {
    Theme.find()
        .exec()
        .then(docs => {
            let urlBase = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

            // Construct response
            const response = {
                count: docs.length,
                themes: docs.map(doc => {
                    // Get the properties of the theme
                    const theme_properties = Utilities.map_to_object(doc["properties"]);

                    return {
                        name: doc.name,
                        properties: {
                            ...theme_properties
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

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.themes_get_theme = (req, res, next) => {
    const id = req.params.themeID;

    // Get specific theme
    Theme.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);

            if (doc) {
                // Get the properties of the theme
                const theme_properties = Utilities.map_to_object(doc["properties"]);

                let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`

                // Send response
                res.status(200).json({
                    theme: {
                        _id: doc._id,
                        name: doc.name,
                        properties: {
                            ...theme_properties
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.themes_create_theme = (req, res, next) => {
    const theme_properties = req.body["properties"];

    // Create theme mongodb doc
    const theme = new Theme({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        properties: {
            ...theme_properties
        }
    });

    theme
        .save()
        .then(result => {
            console.log(result);

            const theme_properties = Utilities.map_to_object(result["properties"]);

            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${result._id}`
            // Send response 
            res.status(201).json({
                message: "Created theme sucessfully",
                createdTheme: {
                    name: result.name,
                    properties: {
                        ...theme_properties
                    },
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

            res.status(500).json({
                error: err
            });
        });
};

exports.themes_update_theme = (req, res, next) => {
    const id = req.params.themeID;

    // Construct update operations object
    const updateOps = {};
    Object.entries(req.body).forEach(([field, newValue]) => {
        updateOps[field] = newValue;
    });

    Theme
        .updateOne({ _id: id}, { $set: updateOps }, { runValidators: true }) // Update document
        .exec()
        .then(result => {
            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${id}`;
            // Send response
            res.status(200).json({
                message: "Theme updated",
                request: {
                    type: "GET",
                    url: url
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

exports.themes_delete_theme = (req, res, next) => {
    const id = req.params.themeID;

    // If the user tries removing an unremovable doc
    if (UNREMOVEABLE_DOC_IDS.includes(id)) {
        return res.status(403).json({
            error: "Forbidden to remove document"
        });
    }

    Theme
        .findByIdAndRemove({ _id: id })
        .exec()
        .then(removed => {
            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
            // Send response
            res.status(200).json({
                message: "Theme deleted",
                request: {
                    type: "POST",
                    url: url,
                    body: {
                        name: "String",
                        properties: "Map of Strings"
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