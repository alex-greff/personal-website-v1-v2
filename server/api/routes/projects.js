const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");
const storageUtility = require("../utilities/storage");

const ProjectsController = require("../controllers/projects");

// Setup multer upload object
const upload = storageUtility.setupFileUpload("projects");


// ----------------
// --- Requests ---
// ----------------

const imageFields = [{ name: "thumbnailImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }];

// [domain]/api/projects : GET
router.get("/", ProjectsController.projects_get_all);

// [domain]/api/projects : POST
router.post("/", permit(false, "create-project"), upload.fields(imageFields), ProjectsController.projects_create_project);

// [domain]/api/projects/[projectID] : GET
router.get("/:projectID", ProjectsController.projects_get_project);

// [domain]/api/projects/[projectID] : PATCH
router.patch("/:projectID", permit(false, "edit-project"), upload.fields(imageFields), ProjectsController.projects_update_project);

// [domain]/api/projects/[projectID] : DELETE
router.delete("/:projectID", permit(false, "delete-project"), ProjectsController.projects_delete_project);


module.exports = router;
