const express=require('express');
const router=express.Router();
const followController=require('../controllers/followController');

router.post("/follow/:id",followController.follow);
router.post("/unfollow/:id",followController.unfollow);
router.get("/info",followController.getMyInfo);
router.get("/info/:nickname",followController.getUserInfo);
router.get("/who-follow",followController.getMyFollowingInfo);

module.exports= router;


