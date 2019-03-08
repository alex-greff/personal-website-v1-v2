const fs = require('fs');

exports.cleanupFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (!err) {
            console.log(filePath, "successfully cleaned up");
        } else {
            console.log(filePath, "not found");
        }
        // Do nothing if file is not found
    });
};