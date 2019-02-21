const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    // Text info
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    // Listed info
    links: { type: Map, of: String, required: false },
    tags: { type: [String], required: false},

    // Images
    thumbnailImage: { type: String, required: true },
    galleryImages: { type: Map, of: String, required: false },

    // Dates
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false }
});

module.exports = mongoose.model('Project', projectSchema);