const mongoose = require('mongoose');

// Setup user shema
let userSchema = mongoose.Schema({
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

// // TODO: Doesnt work b/c "validate" is not fired on update(), "find" is supposed to but does not
// userSchema.pre('validate', { query: true }, function(next) {
//     console.log("PRE CHECK");

//     // Disallow modification of _id and email fields
//     if (self.isModified("_id")) {
//         console.log("_id change detected, invalidating it");
//         self.invalidate("_id");
//         // return next(new Error("Trying to modify restricted data"));
//     }
//     if (self.isModified("email")) {
//         console.log("email change detected, invalidating it");
//         self.invalidate("email");
//         // return next(new Error("Trying to modify restricted data"));
//     }

//     next();
// });

module.exports = mongoose.model('User', userSchema);