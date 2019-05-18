const fs = require('fs');
const storage = require("./storage");
const soundCloudScraper = require("./soundcloudScraper");

exports.StorageUtility = storage;
exports.SoundCloudScraper = soundCloudScraper;

exports.cleanupFile = (i_sFilePath) => {
    // Convert to relative path, if needed
    const sRelFilePath = i_sFilePath.replace(/\.\/|^\//, "./"); 

    fs.unlink(sRelFilePath, (err) => {
        if (!err) {
            console.log(`Successfully cleaned up file '${sRelFilePath}'`);
        } else { // Do nothing if file is not found, just log it
            console.log(`Unable to clean up file '${sRelFilePath}'`);
        }
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

exports.isEmail = (i_sEmail) => {
    const rEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return rEmailRegex.test(i_sEmail);
};

exports.isColorFormat = (i_sColor) => {
    const rColorFormat = /^[0-9]{1,3},\040[0-9]{1,3},\040[0-9]{1,3}$/;
    return rColorFormat.test(i_sColor);
};

exports.validateMap = (i_mMap, i_fnValidator) => {
    let bValid = true;
    i_mMap.forEach((i_val) => {
        bValid = bValid && i_fnValidator(i_val);
    });
    return bValid;
};

exports.validateObject = (i_oObj, i_fnValidator) => {
    console.log("VALIDATE OBJECT", i_oObj, typeof i_oObj);
    let bValid = true;
    Object.values(i_oObj).forEach((i_val) => {
        console.log("VAL:", i_val, "VALID:", i_fnValidator(i_val));
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

/**
 * Returns a new object with only the filtered keys in it.
 * 
 * @param {Object} i_oObj The source object.
 * @param  {...String} i_aKeys The filtered keys. Format: "<destination key>:<object key>", shorthand "<key>" <=> "<key>:<key>"
 */
exports.filterByKeys = (i_oObj, ...i_aKeys) => {
    return i_aKeys.reduce((acc, i_sCurrKey) => {
        const aCurrKeySplit = i_sCurrKey.split(':');
        const sRetKey = aCurrKeySplit[0];
        const sObjKey = (aCurrKeySplit.length > 1) ? aCurrKeySplit[1] : aCurrKeySplit[0];

        return {
            ...acc,
            [sRetKey]: i_oObj[sObjKey]
        };
    }, {});
};

// Link validators (unused at the moment)
exports.linkValidator = (i_sVal) => !i_sVal || exports.isLink(i_sVal);
exports.linkMapValidator = (i_mMap) => exports.validateMap(i_mMap, exports.linkValidator);
exports.linkObjectValidator = (i_oObj) => exports.validateObject(i_oObj, exports.linkValidator);

// Color validators (unused at the moment)
exports.colorValidator = (i_sVal) => !i_sVal || exports.isColorFormat(i_sVal);
exports.colorMapValidator = (i_mMap) => exports.validateMap(i_mMap, exports.colorValidator);
exports.colorObjectValidator = (i_oObj) => exports.validateObject(i_oObj, exports.colorValidator);