const mongoose = require('mongoose');

const colorFormat = /^[0-9]{1,3},\040[0-9]{1,3},\040[0-9]{1,3}$/;

const themeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // Mandatory
    name: { type: String, required: true, unique: true },

    // Colors
    "--color-page-bg": {
        type: String, 
        match: colorFormat,
        default: "61, 61, 61"
    },
    "--color-page-text": {
        type: String,
        match: colorFormat,
        default: "229, 229, 229"
    },
    "--color-nav-bg": {
        type: String, 
        match: colorFormat,
        default: "42, 42, 42"
    }, 
    "--color-nav-text": {
        type: String,
        match: colorFormat,
        default: "143, 143, 143"
    },
    "--color-sidebar-bg": {
        type: String, 
        match: colorFormat,
        default: "26, 26, 26"
    }, 
    "--color-footer-bg": {
        type: String, 
        match: colorFormat,
        default: "42, 42, 42"
    },
    "--color-footer-text": {
        type: String, 
        match: colorFormat,
        default: "151, 151, 151"
    },
    // Accents
    "--color-accent-primary": {
        type: String, 
        match: colorFormat,
        default: "234, 234, 234"
    },
    "--color-accent-secondary": {
        type: String, 
        match: colorFormat,
        default: "194, 194, 194"
    },
    "--color-accent-tertiary": {
        type: String, 
        match: colorFormat,
        default: "139, 139, 139"
    },
});

module.exports = mongoose.model("Theme", themeSchema);