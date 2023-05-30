const express = require('express');
const router = express.Router();
const setting = require('../controllers/settingController');
const { upload } = require("../multer");

router.post("/check", setting.check);
router.post("/password", setting.password);
router.post("/bio", setting.bio);
router.post("/nickname", setting.nickname);
router.post("/profileImg", upload.single('profileImg'), setting.profileImg);

module.exports = router;