const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const valid = require('../controllers/validController');

router.post("/auth/sign-up",auth.signup);

// router.post("/valid/nickname", valid.nickname);
// router.post("/valid/id", valid.id);
// router.post("/valid/email", valid.email);

module.exports = router;