const { body } = require('express-validator/check');

exports.validate = (req, res, next) => {
    req.checkBody('email', 'Email not provided').exists().isEmail();
    req.checkBody('name', 'Name is not provided').exists();
    req.checkBody('subject', 'Subject is not provided').exists();
    req.checkBody('message', 'Message is not provided').exists();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(500).json({
            error: errors
        });
    }
    next();
};