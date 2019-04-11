const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email }).exec();

        // Check if user already exists
        if (user.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash the password
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
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
            const result = await user.save();

            console.log("User created", result);
            res.status(201).json({
                message: "User successfully created"
            });
        });

    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.user_login = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email }).exec();

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
                        userId: user[0]._id,
                        role: user[0].role
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

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.user_update = async (req, res, next) => {
    const id = req.params.userID;

    // Construct update operations object
    const updateOps = {};
    Object.entries(req.body).forEach(([field, newValue]) => {
        const $name = field;
        var $value = newValue;

        // If the password is being changed
        if ($name === "password") {
            // Hash the password
            try {
                let hash = bcrypt.hashSync($value, 10);
                $value = hash;
            } catch (err) {
                return res.status(500).json({
                    error: err
                });
            };
        }
        else if ($name === "role") {
            // Check if user has access to editing roles and not just self
            if (req.userAccessType !== "role") {
                return res.status(401).json({
                    message: "Unauthorized role edit"
                });
            }
        }
        
        updateOps[$name] = $value;
    });

    try {
        const result = await User.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec(); // Update the user

        let url = `${req.protocol}://${req.headers.host}${req.baseUrl}/login`
        // Send response
        res.status(200).json({
            message: "User data updated",
            request: {
                type: "POST",
                url: url
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.user_delete = async (req, res, next) => {
    try {
        const result = await User.remove({ _id: req.params.userID }).exec();

        // Removal successful, send response
        res.status(200).json({
            message: "User deleted"
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};