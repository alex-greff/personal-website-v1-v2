const mongoose = require('mongoose');

const rEmailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Setup user shema
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: rEmailRegex,
        immutable: true
    },
    password: { type: String, required: true },
    role: { type: String, default: 'default', required: true }
});

// This guards against field changes
// Note: it doesn't throw an error when it stops a change
userSchema.plugin(require("mongoose-immutable-plugin")); 

module.exports = mongoose.model('User', userSchema);