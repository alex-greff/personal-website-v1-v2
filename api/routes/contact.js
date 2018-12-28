const express = require('express');
const router = express.Router();
const ContactValidator = require('../middleware/contact-validator');
// const permit = require("../middleware/permission");

const ContactController = require("../controllers/contact");

// ----------------
// --- Requests ---
// ----------------
// [domain]/api/contact : POST
router.post("/", ContactValidator.validate, ContactController.send_contact_message);

module.exports = router;