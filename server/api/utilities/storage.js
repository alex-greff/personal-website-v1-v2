const multer = require("multer");

exports.setupFileUpload = (i_sDesinationFolder = null, ...i_aMimetypes) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadFilePath = (i_sDesinationFolder) ? `./uploads/${i_sDesinationFolder}` : "./uploads";
            cb(null, uploadFilePath);
        },
        filename: function (req, file, cb) {
            // Bug fix: https://stackoverflow.com/questions/48418680/enoent-no-such-file-or-directory?rq=1
            cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (i_aMimetypes.includes(file.mimetype)) { // Accept
            cb(null, true);
        } else { // Reject
            cb(null, false); 
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

    return upload;
};

exports.setup;