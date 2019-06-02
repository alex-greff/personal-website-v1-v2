const driveContentServer = require("../contentServer/driveContentServer");
const Utilities = require("../utilities");

// Reads all files, uploads them to the Google Drive content server, updates the request.files entries and removes the original files
module.exports = async (req, res, next) => {
    const aAllFiles = Object.values(req.files);
    // Note: we need to use for-of here b/c we're using async/await in the loops
    for (let aFiles of aAllFiles) {
        for (let [nIdx, oFile] of aFiles.entries()) {
            const sFieldName = oFile.fieldname;
            const sSectionName = Utilities.getDriveSectionNameFromPath(oFile.path);
            const sLocalPath = Utilities.convertToRelativePath(oFile.path);
            const { filename: sFileName, mimetype: sMimeType } = oFile;

            try {
                const oUploadRes = await driveContentServer.uploadFile(sFileName, sLocalPath, sMimeType, sSectionName);
                const { link: sDriveLink, id: sFileID, kind: sDriveDestination } = oUploadRes;

                // Mutate the req.file object
                req.files[sFieldName][nIdx].destination = sDriveDestination; // Usually 'drive#file'
                req.files[sFieldName][nIdx].path = sDriveLink;
                req.files[sFieldName][nIdx].id = sFileID;

            } catch(err) {
                console.log("Failed drive content upload", err);
            }

            // Cleanup the local file
            Utilities.cleanupFile(sLocalPath);
        }
    }

    next();
};