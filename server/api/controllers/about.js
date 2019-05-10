const mongoose = require("mongoose");
const About = require("../models/about");
const Utilities = require("../utilities");

const SELECTED_FIELDS = "_id description profileImage links";

exports.about_get_info = async (req, res, next) => {
    try {
        // Only need to find one cuz there should only be one about document
        const doc = await About.findOne().select(SELECTED_FIELDS).exec();

        console.log("FROM DATABASE\n", doc);

        // Construct response
        const response = {
            description: doc.description,
            profileImage: doc.profileImage,
            links: doc.links
        }

        // Send response
        res.status(200).json(response);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.about_override_info = async (req, res, next) => {
    let oldID;

    // Remove the exist document, if it's there. If not, ignore the error and proceed
    try {
        const removed = await About.findOneAndRemove().exec();

        if (!removed) {
            throw "Unable to remove project";
        }

        // Clean up profile image
        Utilities.cleanupFile(removed.profileImage);

        // Store the old ID
        oldID = removed._id;

    } catch(err) {}

    // Create the new, overridden entry

    // Construct profile image path entry
    let profileImagePath;
    if (req.files['profileImage']) {
        profileImagePath = Utilities.sanitizeImagePath(req.files["profileImage"][0].path);
    }

    // Create the About doc
    const about = new About({
        _id: (oldID) ? oldID : new mongoose.Types.ObjectId(),
        description: req.body.description,
        profileImage: profileImagePath,
        links: req.body.links
    });

    // Save the doc to the database
    try {
        const result = await about.save();

        console.log("OVERRODE ABOUT\n", result);

        // Send response 
        res.status(201).json({
            message: "Overrode/initialized about successfully",
            about: {
                _id: result._id,
                description: about.description,
                profileImage: result.profileImage,
                links: result.links
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

exports.about_update_info = async (req, res, next) => {
    try {
        // Construct update operations object
        const updateOps = {};

        Object.entries(req.body).forEach(([field, newValue]) => {
            // Add in the current regular operation 
            updateOps[field] = newValue;
        });

        // If the profile image is being updated then add it to the update ops
        if (!!req.files && !!req.files['profileImage']) {
            updateOps['profileImage'] = Utilities.sanitizeImagePath(req.files['profileImage'][0].path);
        }

        // Only need to find one b/c there should only be one About document
        const doc = await About.findOne().select(SELECTED_FIELDS).exec();

        if (doc) { // If document is found
            // Cleanup the profile image, if needed
            if (!!doc.profileImage && !!updateOps['profileImage']) {
                Utilities.cleanupFile(doc.profileImage);
            }

            console.log("UPDATE OPS\n", updateOps);

            const result = await About.updateOne({}, { $set: updateOps }, { runValidators: true }).exec();

            // TODO: this is a really ugly way of detecting if the file does not exist... is there a better way?
            // If no about is found
            if (result.n < 1) {
                throw "About document not initialized. Change request type to POST."
            }

            // Send response
            res.status(200).json({
                message: "About updated"
            });

        } else {
            throw "About document not initialized. Change request type to POST."
        }

    } catch(err) {
        console.log(err);

        // Delete uploaded files
        Utilities.deleteUploadedFiles(req);

        res.status(500).json({
            error: err
        });
    }
};