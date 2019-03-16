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

exports.map_to_object = (i_mMap) => {
    const oRet = {};

    for (let [key, value] of i_mMap) {
        oRet[key] = value;
    }
    
    return oRet;
};

exports.object_to_map = (i_oObj) => {
    const mRet = new Map();

    Object.entries(i_oObj).forEach(([key, value]) => {
        mRet.set(key, value);
    });

    return mRet;
}