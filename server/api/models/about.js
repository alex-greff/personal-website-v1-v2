const mongoose = require('mongoose');
const Utilities = require("../utilities");

const aboutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    // Text info
    description: { type: String, required: true },

    // Listed info
    // links: { type: Map, of: String, required: false, validate: Utilities.linkMapValidator },
    // links: { type: mongoose.Schema.Types.Mixed, required: false, default: {}, validate: Utilities.linkObjectValidator },
    links: { type: mongoose.Schema.Types.Mixed, required: false, default: {} }, // TODO: get validator working

    // Images
    profileImage: { type: String, required: true }
});

module.exports = mongoose.model('About', aboutSchema);