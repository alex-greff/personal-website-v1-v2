const mongoose = require("mongoose");
const Project = require("../models/project");
const fs = require('fs');

exports.projects_get_all = (req, res, next) => {
    Project.find()
        .select("name description _id thumbnailImage links")
        .exec()
        .then(docs => {
            let urlBase = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

            // Construct response
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        thumbnailImage: doc.thumbnailImage,
                        links: doc.links,
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
    // Create project mongodb doc
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        thumbnailImage: req.file.path,
        links: req.body.links
    });

    project
        .save()
        .then(result => {
            console.log(result);

            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${result._id}`
            // Send response
            res.status(201).json({
                message: "Created project successfully",
                createdProject: {
                    name: result.name,
                    description: result.description,
                    thumbnailImage: result.thumbnailImage,
                    links: result.links,
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

            // Delete uploaded file
            let filePath = `${req.file.path}`;
            fs.unlink(filePath, (err) => {
                if (!err)
                    console.log(filePath + " successfully cleaned up");
                else
                    console.log(filePath + "not found");
                // Do nothing if file is not found
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
        .select("name description _id thumbnailImage links")
        .exec()
        .then(doc => {
            console.log("From database", doc);

            if (doc) { // If document is found
                let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`
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
        });
};

exports.projects_update_project = (req, res, next) => { 
    const id = req.params.projectID;

    // Construct update operations object
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Project
        .update({ _id: id }, { $set: updateOps }) // Update document
        .exec()
        .then(result => {
            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/${id}`
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
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.projects_delete_project = (req, res, next) => { 
    const id = req.params.projectID;
    
    Project
        .findOneAndRemove({ _id: id })
        .exec()
        .then(removed => {
            console.log("Removed", removed);

            // Clean up thumbnail image
            let filePath = removed.thumbnailImage;
            fs.unlink(filePath, (err) => {
                if (!err)
                    console.log(filePath + " successfully cleaned up");
                else
                    console.log(filePath + "not found");
                // Do nothing if file is not found
            });

            // Send response
            let url = `${req.protocol}://${req.headers.host}${req.baseUrl}`
            res.status(200).json({
                message: "Project deleted",
                request: {
                    type: "POST",
                    url: url,
                    body: {
                        name: "String",
                        description: "String",
                        thumbnailImage: "image/JPEG or image/PNG",
                        links: "String Map of String"
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
