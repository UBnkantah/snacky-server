const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const contactController = require("../controller/contactController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/contact", contactController.createContactInfo);

module.exports = router;
