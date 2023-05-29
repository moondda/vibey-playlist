const express = require('express');
const router = express.Router();
const songController=require('../controllers/songController');

router.get("/searchsong", songController.searchsong);

module.exports = router;

