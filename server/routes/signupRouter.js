const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/auth/sign-up", auth.signup);

module.exports = router;
