const keys = require("../../keys");

module.exports = {
    service: keys.contactService,
    auth: {
        user: keys.contactEmail,
        pass: keys.contactPassword
    }
};