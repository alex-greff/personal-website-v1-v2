const jwt = require('jsonwebtoken');
const canDoAllOperations = require("../roles/role-check");

module.exports = function(checkSelf, ...operations) {
    return (req, res, next) => {
        try {
            // Validate token
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
    
            console.log("USER DATA", req.userData);

            // Check if the user is self
            if (checkSelf && req.userData.userId === req.params.userID) {
                console.log("Is self");
                next();
            }

            // Check if user has access
            if (req.userData && canDoAllOperations(req.userData.role, ...operations)) {
                next();
            }
            else {
                res.status(401).json({
                    message: 'Authorization failed'
                });
            }
        } catch (error) {
            return res.status(401).json({
                message: 'Authorization failed'
            });
        }
    }
}