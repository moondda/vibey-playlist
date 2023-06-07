const express = require('express');
const router = express.Router();
const songController=require('../controllers/songController2');

router.get("/search", songController.searchsong);
router.post("/posting", songController.postsong);
router.delete("/deletepost/:trackId",songController.deletePost);
router.get("/mypost",songController.getMyPost);
router.get("/other-post/:nickname",songController.getUserPost);


module.exports = router;

