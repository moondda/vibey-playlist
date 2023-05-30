const express = require('express');
const router = express.Router();
const songController=require('../controllers/songController2');

router.get("/search", songController.searchsong);

router.post("/posting", songController.postsong);
router.delete("/deletepost/:id",songController.deletePost);

module.exports = router;

