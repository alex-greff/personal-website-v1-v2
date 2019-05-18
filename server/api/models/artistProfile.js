const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    username: { type: String, required: true, unique: true },
    userID: { type: String, required: true },

    tracks: [ 
        {
            trackID: { type: String, required: true },
            title: { type: String, required: true },
            permalink: { type: String, required: true },
            createdDate: { type: Date, required: true },
            description: { type: String, default: "" },
            artworkURL: { type: String, required: true }, 
        }
    ], 
});

module.exports = mongoose.model('ArtistProfile', artistSchema);