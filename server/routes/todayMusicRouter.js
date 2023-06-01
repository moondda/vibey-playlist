const express = require('express');
const router = express.Router();
const todayMusic = require('../controllers/todayMusicController');

router.get("/random", todayMusic.random);

module.exports = router;