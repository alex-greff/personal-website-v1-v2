const { google } = require("googleapis");
const fs = require("fs");
const keys = require("../../keys");

let auth;

const CLIENT_EMAIL = keys.driveClientEmail;
const PRIVATE_KEY = keys.drivePrivateKey.replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
const ROOT_FOLDER_ID = keys.driveRootFolderID;

const _filesList = async (i_sQuery) => {
    await exports.authorize();
    const drive = google.drive({ version: 'v3', auth });

    try {
        const config = {
            q: i_sQuery
        };
        const res = await drive.files.list(config);
        return res.data.files;
    } catch(err) {
        console.log("Drive error:", err);
    }
};

const _getFileResourceLink = (i_sFileID) => {
    return `https://drive.google.com/uc?export=view&id=${i_sFileID}`;
};

exports.authorize = async (i_bForceRefresh = false) => {
    if (auth && !i_bForceRefresh) {
        return;
    }

    const jwtClient = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, ["https://www.googleapis.com/auth/drive"], null);

    try {
        await jwtClient.authorize();
        auth = jwtClient;
        console.log("Drive authorization successful");
    } catch(err) {
        console.log("Drive authorization failed:", err);
    }
};

exports.getSectionID = async (i_sSectionName = null) => {
    if (!i_sSectionName) {
        return ROOT_FOLDER_ID;
    }

    const sQuery = `'${ROOT_FOLDER_ID}' in parents and trashed=false and mimeType='application/vnd.google-apps.folder' and name='${i_sSectionName}'`
    const aFolders = await _filesList(sQuery);

    return (aFolders.length > 0) ? aFolders[0].id : null;
};

exports.sectionExists = async (i_sSectionName) => {
    return !!(await exports.getSectionID(i_sSectionName));
};

exports.createSection = async (i_sSectionName) => {
    await exports.authorize();
    const drive = google.drive({ version: 'v3', auth });
    const sRootID = await exports.getSectionID();

    const res = await drive.files.create({
        resource: {
            name: i_sSectionName,
            parents: [sRootID],
            mimeType: 'application/vnd.google-apps.folder'
        }   
    });

    return res.data.id;
};

exports.getAllFiles = async (i_sSectionName = null) => {
    const sSectionID = (i_sSectionName) ? await exports.getSectionID(i_sSectionName) : ROOT_FOLDER_ID;

    const sQuery = `'${sSectionID}' in parents and trashed=false and mimeType!='application/vnd.google-apps.folder'`;
    const aFiles = await _filesList(sQuery);

    return aFiles.map(oFile => {
        return { 
            ...oFile, 
            link: _getFileResourceLink(oFile.id) 
        }
    });
};

exports.getFile = async (i_sFileName, i_sSectionName = null) => {
    const sSectionID = (i_sSectionName) ? await exports.getSectionID(i_sSectionName) : ROOT_FOLDER_ID;

    const sQuery = `'${sSectionID}' in parents and trashed=false and mimeType!='application/vnd.google-apps.folder' and name='${i_sFileName}'`;
    const aFiles = await _filesList(sQuery);
    
    return (aFiles.length > 0) ? { ...aFiles[0], link: _getFileResourceLink(oFile.id) } : null;
};

exports.uploadFile = async (i_sFileName, i_sFilePath, i_sMimeType, i_sSectionName = null) => {
    await exports.authorize();
    const drive = google.drive({ version: 'v3', auth });

    let sSectionID = (i_sSectionName) ? await exports.getSectionID(i_sSectionName) : ROOT_FOLDER_ID;

    if (!sSectionID) { // If section doesnt exist, then create the section
        sSectionID = await exports.createSection(i_sSectionName); 
    }

    const res = await drive.files.create({
        resource: {
            name: i_sFileName,
            parents: [sSectionID]
        },
        media: {
            mimeType: i_sMimeType,
            body: fs.createReadStream(i_sFilePath),
        }
    });

    return {
        ...res.data,
        link: _getFileResourceLink(res.data.id)
    };
};

exports.deleteFile = async (i_sFileID) => {
    await exports.authorize();
    const drive = google.drive({ version: 'v3', auth });

    await drive.files.delete({
        fileId: i_sFileID
    });
};



exports.__test__ = async () => {
    // let aAllFiles = await exports.getAllFiles("test");
    // console.log("ALL FILES test", aAllFiles);

    // const sCreatedSection = await exports.createSection("test2");
    // console.log("CREATED SECTION", sCreatedSection);

    // const sFilePath = "./uploads/projects/2019-05-29T02-38-49.521Z-thumbnail.jpg";
    // const oUploadRes = await exports.uploadFile("test_image.jpg", sFilePath, "image/jpeg", "test2");
    // console.log("UPLOAD RES", oUploadRes);

    // aAllFiles = await exports.getAllFiles("test2");
    // console.log("ALL FILES test2", aAllFiles);

    // console.log("DELETING FILE", aAllFiles[0].id)
    // await exports.deleteFile(aAllFiles[0].id);
}