const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");
const storageUtility = require("../utilities/storage");

const ExperienceController = require("../controllers/experience");

// Setup multer upload object
const upload = storageUtility.setupFileUpload("experience");


// ----------------
// --- Requests ---
// ----------------

const imageFields = [{ name: "thumbnailImage", maxCount: 1 }];

// [domain]/api/experiences : GET
router.get("/", ExperienceController.experience_get_all);

// [domain]/api/experiences : POST 
router.post("/", permit(false, "create-experience"), upload.fields(imageFields), ExperienceController.experience_create_experience);

// [domain]/api/expereince/[experienceID] : GET
router.get("/:experienceID", ExperienceController.experience_get_experience);

// [domain]/api/experience/[experienceID] : PATCH
router.patch("/:experienceID", permit(false, "edit-experience"), upload.fields(imageFields), ExperienceController.experience_update_experience);

// [domain]/api/experience/[experienceID] : DELETE
router.delete("/:experienceID", permit(false, "delete-project"), ExperienceController.experience_delete_experience);


module.exports = router;