const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // Mandatory
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailImage: { type: String, required: true}, 

    // Optional
    images: [ { type: String, required: false, } ],
    links: { type: Map, of: String, required: false }
});

module.exports = mongoose.model('Product', productSchema);