const fs = require('fs');
const storage = require("./storage");

exports.StorageUtility = storage;

exports.cleanupFile = (filePath) => {
    const correctedFilePath = filePath.replace(/^\//, "");

    fs.unlink(correctedFilePath, (err) => {
        if (!err) {
            console.log(filePath, "successfully cleaned up");
        } else {
            console.log(filePath, "not found");
        }
        // Do nothing if file is not found
    });
};

exports.deleteUploadedFiles = (req) => {
    // Delete uploaded files
    const fields = Object.entries(req.files);
    // Iterate through each field
    fields.forEach(([field, files])=> {
        // Iterate through the files in the current field
        files.forEach(file => {
            // Remove each file
            exports.cleanupFile(file.path);
        });
    });
}

exports.map_to_object = (i_mMap, recursive = false) => {
    const oRet = {};

    for (let [key, value] of i_mMap) {
        if (recursive && value instanceof Map) {
            oRet[key] = { ...exports.map_to_object(value, true) };
        } else {
            oRet[key] = value;
        }
    }
    
    return oRet;
};

exports.object_to_map = (i_oObj, recursive = false) => {
    const mRet = new Map();

    Object.entries(i_oObj).forEach(([key, value]) => {
        if (recursive && exports.isObject(value)) {
            mRet.set(key, exports.object_to_map(value, true));
        } else {
            mRet.set(key, value);
        }
    });

    return mRet;
};

exports.isObject = (i_oObj) => {
    return (!!i_oObj) && (i_oObj.constructor === Object);
};

exports.isLink = (i_sLink) => {
    const rLinkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return rLinkRegex.test(i_sLink);
};

exports.validateMap = (i_mMap, i_fnValidator) => {
    let bValid = true;
    i_mMap.forEach((i_val) => {
        bValid = bValid && i_fnValidator(i_val);
    });
    return bValid;
};

exports.getURLBase = (req) => {
    return `${req.protocol}://${req.headers.host}${req.baseUrl}`;
};

exports.sanitizeImagePath = (raw) => {
    return `/${raw.replace(/\\/g, "/")}`;
};

exports.linkValidator = (i_sVal) => !i_sVal || exports.isLink(i_sVal);

exports.linkMapValidator = (i_mMap) => exports.validateMap(i_mMap, exports.linkValidator);