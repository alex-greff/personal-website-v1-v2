const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");

const ExperienceController = require("../controllers/experience");

// ----------------
// --- Requests ---
// ----------------

// [domain]/api/experiences : GET
router.get("/", ExperienceController.experience_get_all);

// [domain]/api/experiences : POST 
router.post("/", permit(false, "create-experience"), ExperienceController.experience_create_experience);

// [domain]/api/expereince/[experienceID] : GET
router.get("/:experienceID", ExperienceController.experience_get_experience);

// [domain]/api/experience/[experienceID] : PATCH
router.patch("/:experienceID", permit(false, "edit-experience"), ExperienceController.experience_update_experience);

// [domain]/api/experience/[experienceID] : DELETE
router.delete("/:experienceID", permit(false, "delete-project"), ExperienceController.experience_delete_experience);


module.exports = router;