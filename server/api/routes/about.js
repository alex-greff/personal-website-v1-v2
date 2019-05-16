const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");
const injectMarkdown = require("../middleware/markdown-injector");
const storageUtility = require("../utilities/storage");
const mimetypes = require("../constants/mimetypes");

const AboutController = require("../controllers/about");

// Setup multer upload object
const upload = storageUtility.setupFileUpload("about", ...mimetypes.image, ...mimetypes.markdown);

const fileFields = [
    { name: "profileImage", maxCount: 1 }, 
    { name: "description", maxCount: 1 }
];


// ----------------
// --- Requests ---
// ----------------

// [domain]/api/about : GET
router.get("/", AboutController.about_get_info);

// [domain]/api/about : POST
router.post("/", permit(false, "override-about"), upload.fields(fileFields), injectMarkdown, AboutController.about_override_info)

// [domain]/api/about : PATCH
router.patch("/", permit(false, "edit-about"), upload.fields(fileFields), injectMarkdown, AboutController.about_update_info);

module.exports = router;