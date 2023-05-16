const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post("/sign-up",auth.signup);
router.post("/login",auth.login);

module.exports = router;