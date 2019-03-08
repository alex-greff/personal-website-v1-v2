const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");

const UserController = require("../controllers/user");

// ----------------
// --- Requests ---
// ----------------

// [domain]/api/user/signup : POST
router.post("/signup", UserController.user_signup);

// [domain]/api/user/login : POST
router.post("/login", UserController.user_login);

// [domain]/api/user/[userID] : DELETE
router.delete("/:userID", permit(true, "delete-user"), UserController.user_delete);

// [domain]/api/user/[userID] : PATCH
router.patch("/:userID", permit(true, "edit-user"), UserController.user_update);

module.exports = router;