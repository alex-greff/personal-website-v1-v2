const mongoose = require('mongoose');

const clientIDSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    updated: { type: Date, default: Date.now },

    clientID: { type: String, required: true }
});

module.exports = mongoose.model('ClientID', clientIDSchema);