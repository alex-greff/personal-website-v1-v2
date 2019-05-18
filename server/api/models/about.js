const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    // Text info
    description: { type: String, required: true },

    // Listed info
    links: { type: mongoose.Schema.Types.Mixed, required: false, default: {} },

    // Images
    profileImage: { type: String, required: true }
});

module.exports = mongoose.model('About', aboutSchema);