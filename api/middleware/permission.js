const jwt = require('jsonwebtoken');

module.exports = function(minPermissionLevel) {
    // Function checking if the permissions are allowed
    const isAllowed = (role) => role >= minPermissionLevel;

    return (req, res, next) => {
        try {
            // Validate token
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
    
            console.log("USER DATA", req.userData);
    
            // Check if user has access
            if (req.userData && isAllowed(req.userData.permissionLevel)) {
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