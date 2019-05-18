const mongoose = require("mongoose");

const themeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: { type: String, required: true, unique: true },
    baseTheme: { type: Boolean, required: false, default: false },

    BASE: { type: mongoose.Schema.Types.Mixed, required: false, default: {} },
    subSections: { type: mongoose.Schema.Types.Mixed, required: false, default: {} }
}, { minimize: false });

module.exports = mongoose.model("Theme", themeSchema);