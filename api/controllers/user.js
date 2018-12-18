const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .then(user => {
            // Check if user already exists
            if (user.length > 0) {
                return res.status(409).json({
                    message: "User already exists"
                });
            }

            // Hash the password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // Check if an error occurred while hashing
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }

                // Construct the user object
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });

                // Save the user and send the result
                user
                    .save()
                    .then(result => {
                        console.log("User created", result);
                        res.status(201).json({
                            message: "User successfully created"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
            });
        });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // If the user is not found
            if (user.length <= 0) {
                return res.status(401).json({
                    message: "Authorization failed"
                });
            }

            // Compare the password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                // If the comparison fails
                if (err) {
                    return res.status(401).json({
                        message: "Authorization failed"
                    });
                }

                // Comparison successful
                if (result) {
                    // Generate token
                    const token = jwt.sign(
                        {
                            email: user[0].email, 
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: process.env.TOKEN_EXPIRE_TIME
                        }
                    );
                    // Send response
                    return res.status(200).json({
                        message: "Authorization successful",
                        token: token
                    });
                }

                // If it gets down here then some other error occurred
                res.status(401).json({
                    message: "Authorization failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_delete = (req, res, next) => {
    User
        .remove({ _id: req.params.userID })
        .exec()
        .then(result => {
            // Removal successful, send response
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};