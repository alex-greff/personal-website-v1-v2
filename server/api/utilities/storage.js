const multer = require("multer");

exports.setupFileUpload = (desinationFolder = null) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadFilePath = (desinationFolder) ? `./uploads/${desinationFolder}` : "./uploads";
            cb(null, uploadFilePath);
        },
        filename: function (req, file, cb) {
            // Bug fix: https://stackoverflow.com/questions/48418680/enoent-no-such-file-or-directory?rq=1
            cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
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
}