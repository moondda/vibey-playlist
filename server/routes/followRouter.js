const express=require('express');
const router=express.Router();
const followController=require('../controllers/followController');

router.post("/follow/:id",followController.follow);
router.post("/unfollow/:id",followController.unfollow);
router.get("/info",followController.getUserInfo);

module.exports= router;


