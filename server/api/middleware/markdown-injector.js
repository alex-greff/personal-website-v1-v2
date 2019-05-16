const fs = require("fs");
const Utilities = require("../utilities");
const mimetypes = require("../constants/mimetypes");

module.exports = (req, res, next) => {
    // Filter all markdown files
    const aMarkdownFiles = Object.values(req.files).filter((i_aFiles) => {
        return mimetypes.markdown.includes(i_aFiles[0].mimetype);
    });

    aMarkdownFiles.forEach((i_aFiles) => {
        // Note: we only look at the first file
        const oFile = i_aFiles[0]; 

        // Santize and convert to relative path
        const sFilePath = `.${Utilities.sanitizeImagePath(oFile.path)}`; 
        const sFieldName = oFile.fieldname;

        // Read the markdown from the file
        const sMarkdownContent = fs.readFileSync(sFilePath, "utf8"); 

        // Inject the parsed markdown into the body
        req.body[sFieldName] = sMarkdownContent;

        // Clean up the markdown file
        Utilities.cleanupFile(sFilePath);
    });

    next();
};