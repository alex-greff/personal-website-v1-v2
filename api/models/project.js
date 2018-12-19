const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // Mandatory
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnailImage: { type: String, required: true },

    // Optional
    // images: [ { type: String, required: false, } ],
    links: { type: String, of: String, required: false }
});

module.exports = mongoose.model('Project', projectSchema);