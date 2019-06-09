const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    // Text info
    name: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    description: { type: String, required: false, default: null },

    // Listed info
    links: { type: mongoose.Schema.Types.Mixed, required: false, default: {} }, 
    tags: { type: [String], required: false},

    // Images
    thumbnailImage: { type: String, required: true },
    galleryImages: { type: Map, of: String, required: false },

    // Dates
    startDate: { type: Date, required: false, default: null }, // Null implies unknown start date
    endDate: { type: Date, required: false, default: null } // Null implies ongoing
});

module.exports = mongoose.model('Project', projectSchema);