const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");
const storageUtility = require("../utilities/storage");

const AboutController = require("../controllers/about");

// Setup multer upload object
const upload = storageUtility.setupFileUpload("about");


// ----------------
// --- Requests ---
// ----------------

const imageFields = [{ name: "profileImage", maxCount: 1 }];

// [domain]/api/about : GET
router.get("/", AboutController.about_get_info);

// [domain]/api/about : POST
router.post("/", permit(false, "edit-about"), upload.fields(imageFields), AboutController.about_override_info)

// [domain]/api/about : PATCH
router.patch("/", permit(false, "edit-about"), upload.fields(imageFields), AboutController.about_update_info);

module.exports = router;