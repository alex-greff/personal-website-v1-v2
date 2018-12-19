const express = require("express");
const router = express.Router();
const multer = require("multer");
const permit = require("../middleware/permission");

const ProjectsController = require("../controllers/projects");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
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

// ----------------
// --- Requests ---
// ----------------

// [domain]/api/projects : GET
router.get("/", ProjectsController.projects_get_all);

// [domain]/api/projects : POST
router.post("/", permit(false, "create-project"), upload.single("thumbnailImage"), ProjectsController.projects_create_project);

// [domain]/api/projects/[projectID] : GET
router.get("/:projectID", ProjectsController.projects_get_project);

// [domain]/api/projects/[projectID] : PATCH
router.patch("/:projectID", permit(false, "edit-project"), ProjectsController.projects_update_project);

// [domain]/api/projects/[projectID] : DELETE
router.delete("/:projectID", permit(false, "delete-project"), ProjectsController.projects_delete_project);


module.exports = router;
