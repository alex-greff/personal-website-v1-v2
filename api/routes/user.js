const express = require("express");
const router = express.Router();
// TODO: auth import

const UserController = require("../controllers/user");

// ----------------
// --- Requests ---
// ----------------

// [domain]/api/user/signup : POST
router.post("/signup", UserController.user_signup);

// [domain]/api/user/login : POST
router.post("/login", UserController.user_login);

// [domain]/api/user/[userID] : DELETE
router.post("/:userID", UserController.user_delete); // TODO: check auth

module.exports = router;