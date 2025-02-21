const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth");

router.post("/signup", authController.signup); // Signup route without validation

router.post("/login", authController.login);

module.exports = router;
