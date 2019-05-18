const nodemailer = require('nodemailer');
const EMAIL_INFO = require('../constants/contact');

exports.send_contact_message = (req, res, next) => {
    try {
        const { email, name, subject, message } = req.body;

        const email_subject = `Personal Website Contact: ${subject}`;
        const email_message = `From: ${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`;

        const transporter = nodemailer.createTransport(EMAIL_INFO);

        const mailOptions = {
            from: EMAIL_INFO.auth.user,
            to: EMAIL_INFO.auth.user,
            subject: email_subject,
            text: email_message
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log("Error", err);

                res.status(500).json({
                    error: err
                });

            } else {
                console.log("Email sent:", info.response);

                res.status(200).json({
                    message: "Email sent",
                    info: info.response
                });
            }
        });

    } catch(err) {
        console.log(err);

        res.status(500).json({
            error: err
        });
    }
};