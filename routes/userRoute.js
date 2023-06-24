const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const contactController = require("../controller/contactController");
const stripe = require("../controller/stripeController")

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/contact", contactController.createContactInfo);
router.post("/create-checkout-session", stripe.checkout)

module.exports = router;
