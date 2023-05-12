const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post("/auth/sign-up",auth.signup);
router.get("/valid/email/confirm/:token",auth.trueToken);

module.exports = router;