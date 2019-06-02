const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");
const injectMarkdown = require("../middleware/markdown-injector");
const storageUtility = require("../utilities/storage");
const mimetypes = require("../constants/mimetypes");
const driveUploader = require("../middleware/drive-content-uploader");

const ExperienceController = require("../controllers/experience");

// Setup multer upload object
const upload = storageUtility.setupFileUpload("projects", ...mimetypes.image, ...mimetypes.markdown);

const fileFields = [
    { name: "summary", maxCount: 1 }
];


// ----------------
// --- Requests ---
// ----------------

// [domain]/api/experiences : GET
router.get("/", ExperienceController.experience_get_all);

// [domain]/api/experiences : POST 
router.post("/", permit(false, "create-experience"), upload.fields(fileFields), injectMarkdown, driveUploader, ExperienceController.experience_create_experience);

// [domain]/api/expereince/[experienceID] : GET
router.get("/:experienceID", ExperienceController.experience_get_experience);

// [domain]/api/experience/[experienceID] : PATCH
router.patch("/:experienceID", permit(false, "edit-experience"), upload.fields(fileFields), injectMarkdown, driveUploader, ExperienceController.experience_update_experience);

// [domain]/api/experience/[experienceID] : DELETE
router.delete("/:experienceID", permit(false, "delete-project"), ExperienceController.experience_delete_experience);


module.exports = router;