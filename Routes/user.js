const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../Controller/user');  // Import the registerUser controller
const auth = require('../Middleware/auth');

// Route to register a new user
router.post('/register', registerUser);


router.post("/login", auth, loginUser);

module.exports = router;
