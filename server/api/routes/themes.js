const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");

const ThemeController = require("../controllers/themes");

// ----------------
// --- Requests ---
// ----------------

// [domain]/api/projects : GET
router.get("/", ThemeController.themes_get_all);

// [domain]/api/projects : POST
router.post("/", permit(false, "create-theme"), ThemeController.themes_create_theme);

// [domain]/api/projects/[projectID] : GET
router.get("/:themeID", ThemeController.themes_get_theme);

// [domain]/api/projects/[projectID] : PATCH
router.patch("/:themeID", permit(false, "edit-theme"), ThemeController.themes_update_theme);

// [domain]/api/projects/[projectID] : DELETE
router.delete("/:themeID", permit(false, "delete-theme"), ThemeController.themes_delete_theme);

module.exports = router;