const mongoose = require('mongoose');
const Utilities = require("../utilities");

const experienceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    // Text info
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyLink: { type: String, default: null, validate: Utilities.isLink }, // Null implies no company link
    summary: { type: String, required: true },

    // Images
    thumbnailImage: { type: String, required: true },

    // Dates
    startDate: { type: Date, required: false, default: null }, // Null implies unknown start date
    endDate: { type: Date, required: false, default: null } // Null implies ongoing
});

module.exports = mongoose.model("Experience", experienceSchema);