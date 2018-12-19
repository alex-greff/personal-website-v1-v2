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

// TODO: add request to modify user permissions
//   - with edit self access

module.exports = router;