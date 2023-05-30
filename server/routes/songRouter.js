const express = require('express');
const router = express.Router();
const songController=require('../controllers/songController2');

router.get("/search", songController.searchsong);

module.exports = router;

