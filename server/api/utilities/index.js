const fs = require('fs');
const storage = require("./storage");
const soundCloudScraper = require("./soundcloudScraper");
const driveContentServer = require("../contentServer/driveContentServer");

exports.StorageUtility = storage;
exports.SoundCloudScraper = soundCloudScraper;

exports.cleanupFile = async (i_sFilePath) => {
    // Convert to relative path, if needed
    const sSanitizedFilePath = exports.convertToRelativePath(i_sFilePath);

    try {
        if (exports.isDriveLink(sSanitizedFilePath)) {
            const sID = exports.getDriveFileIDFromLink(sSanitizedFilePath);
            // Remove file from content server
            await driveContentServer.deleteFile(sID); 
        } else {
            // Remove file from local file system
            fs.unlinkSync(sSanitizedFilePath);
        }

        console.log(`Successfully cleaned up file '${sSanitizedFilePath}'`);
    } catch(err) {
        console.log(`Unable to clean up file '${sSanitizedFilePath}'`);
    }
};

exports.deleteUploadedFiles = (req) => {
    // Delete uploaded files
    const fields = Object.entries(req.files);
    // Iterate through each field
    fields.forEach(([field, files]) => {
        // Iterate through the files in the current field
        files.forEach(file => {
            // Remove each file
            exports.cleanupFile(file.path);
        });
    });
};

exports.convertToRelativePath = (i_sFilePath) => {
    // Convert to relative path, if needed
    return i_sFilePath.replace(/\.\/|^\//, "./");
};

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
    return `${req.baseUrl}`;
};

exports.sanitizeImagePath = (raw) => {
    // Do not sanitize anything if raw is a drive link
    if (exports.isDriveLink(raw)) {
        return raw;
    }

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

// Source: https://www.sitepoint.com/get-url-parameters-with-javascript/
exports.getAllUrlParams = (i_sUrl, i_bCaseSensitive = false) => {

    // get query string from url (optional) or window
    var queryString = i_sUrl ? i_sUrl.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            if (!i_bCaseSensitive) {
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
            }

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
};

exports.getDriveFileIDFromLink = (i_sFileLink) => {
    const oParams = exports.getAllUrlParams(i_sFileLink, true);
    return oParams.id;
}

exports.getDriveSectionNameFromPath = (i_sFilePath) => {
    // Form of typical filepath: [root]/[section]/[filename]
    const aSplit = i_sFilePath.split("/");
    if (aSplit.length < 3) {
        return null;
    }
    // Take second last entry as the section name
    return aSplit[aSplit.length - 2];
};

exports.isDriveLink = (i_sLink) => {
    return i_sLink.startsWith("https://drive.google.com");
};

// Link validators (unused at the moment)
exports.linkValidator = (i_sVal) => !i_sVal || exports.isLink(i_sVal);
exports.linkMapValidator = (i_mMap) => exports.validateMap(i_mMap, exports.linkValidator);
exports.linkObjectValidator = (i_oObj) => exports.validateObject(i_oObj, exports.linkValidator);

// Color validators (unused at the moment)
exports.colorValidator = (i_sVal) => !i_sVal || exports.isColorFormat(i_sVal);
exports.colorMapValidator = (i_mMap) => exports.validateMap(i_mMap, exports.colorValidator);
exports.colorObjectValidator = (i_oObj) => exports.validateObject(i_oObj, exports.colorValidator);