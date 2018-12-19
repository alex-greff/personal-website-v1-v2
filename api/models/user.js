const mongoose = require('mongoose');

// Setup user shema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        immutable: true
    },
    password: { type: String, required: true },
    role: { type: String, default: 'default', required: true }
});

// TODO: the problem with this is that it does not throw an error
userSchema.plugin(require("mongoose-immutable-plugin")); 

// TODO: Doesnt work
// userSchema.pre('validate', function(next) {
//     // Disallow modification of _id and email fields
//     if (self.isModified("_id")) {
//         // self.invalidate("_id");
//         return next(new Error("Trying to modify restricted data"));
//     }
//     if (self.isModified("email")) {
//         // self.invalidate("email");
//         return next(new Error("Trying to modify restricted data"));
//     }

//     return next();
// });

module.exports = mongoose.model('User', userSchema);