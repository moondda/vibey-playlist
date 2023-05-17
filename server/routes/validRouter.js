const express = require('express');
const router = express.Router();
const valid = require('../controllers/validController');

router.post("/exists/email",valid.email);
router.post("/exists/id",valid.id);
router.post("/exists/nickname",valid.nickname);

// router.get("/email/send",valid.trueToken);
router.get("/email/confirm/:token",valid.confirm);
router.post("/email/check",valid.check);

module.exports = router;