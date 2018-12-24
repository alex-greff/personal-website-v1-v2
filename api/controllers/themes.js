const mongoose = require('mongoose');
const Theme = require('../models/theme');

// const selectStr = "name _id '--color-page-bg' '--color-nav-bg' '--color-sidebar-bg' '--color-footer-bg' " +
    // "'--color-footer-text' '--color-accent-primary' '--color-accent-secondary' '--color-accent-tertiary'";

const UNREMOVEABLE_DOC_IDS = ["5c203f373175b50ebc77ebf4"]; // ["default"]

exports.themes_get_all = (req, res, next) => {
    Theme.find()
        // .select(selectStr)
        .exec()
        .then(docs => {
            let urlBase = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

            // Construct response
            const response = {
                count: docs.length,
                themes: docs.map(doc => {
                    return {
                        name: doc.name,
                        "--color-page-bg": doc["--color-page-bg"],
                        "--color-nav-bg": doc["--color-nav-bg"],
                        "--color-sidebar-bg": doc["--color-sidebar-bg"],
                        "--color-footer-bg": doc["--color-footer-bg"],
                        "--color-footer-text": doc["--color-footer-text"],
                        "--color-accent-primary": doc["--color-accent-primary"],
                        "--color-accent-secondary": doc["--color-accent-secondary"],
                        "--color-accent-tertiary": doc["--color-accent-tertiary"],
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
}

exports.themes_create_theme = (req, res, next) => {
    // Create theme mongodb doc
    const theme = new Theme({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        "--color-page-bg": req.body["--color-page-bg"],
        "--color-nav-bg": req.body["--color-nav-bg"],
        "--color-sidebar-bg": req.body["--color-sidebar-bg"],
        "--color-footer-bg": req.body["--color-footer-bg"],
        "--color-footer-text": req.body["--color-footer-text"],
        "--color-accent-primary": req.body["--color-accent-primary"],
        "--color-accent-secondary": req.body["--color-accent-secondary"],
        "--color-accent-tertiary": req.body["--color-accent-tertiary"],
    });

    theme
        .save()
        .then(result => {
            console.log(result);

            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${result._id}`
            // Send response 
            res.status(201).json({
                message: "Created theme sucessfully",
                createdTheme: {
                    name: result.name,
                    "--color-page-bg": result["--color-page-bg"],
                    "--color-nav-bg": result["--color-nav-bg"],
                    "--color-sidebar-bg": result["--color-sidebar-bg"],
                    "--color-footer-bg": result["--color-footer-bg"],
                    "--color-footer-text": result["--color-footer-text"],
                    "--color-accent-primary": result["--color-accent-primary"],
                    "--color-accent-secondary": result["--color-accent-secondary"],
                    "--color-accent-tertiary": result["--color-accent-tertiary"],
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

exports.themes_get_theme = (req, res, next) => {
    const id = req.params.themeID;

    // Get specific theme
    Theme.findById(id)
        .exec()
        // .select(selectStr)
        .then(doc => {
            console.log("From database", doc);

            if (doc) {
                let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`

                // Send response
                res.status(200).json({
                    theme: {
                        _id: doc._id,
                        name: doc.name,
                        "--color-page-bg": doc["--color-page-bg"],
                        "--color-nav-bg": doc["--color-nav-bg"],
                        "--color-sidebar-bg": doc["--color-sidebar-bg"],
                        "--color-footer-bg": doc["--color-footer-bg"],
                        "--color-footer-text": doc["--color-footer-text"],
                        "--color-accent-primary": doc["--color-accent-primary"],
                        "--color-accent-secondary": doc["--color-accent-secondary"],
                        "--color-accent-tertiary": doc["--color-accent-tertiary"],
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

exports.themes_update_theme = (req, res, next) => {
    const id = req.params.themeID;

    // Construct update operations object
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

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
                        "--color-page-bg": "String",
                        "--color-nav-bg": "String",
                        "--color-sidebar-bg": "String",
                        "--color-footer-bg": "String",
                        "--color-footer-text": "String",
                        "--color-accent-primary": "String",
                        "--color-accent-secondary": "String",
                        "--color-accent-tertiary": "String",
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