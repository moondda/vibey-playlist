const User=require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../variables.env' });

const decode = async (token) => {
    // 토큰 해독
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded; // 토큰에서 추출된 _id 값
      return userId;
    } catch (error) {
      console.error('토큰 해독 실패:', error);
      console.log(token);
      throw error;
    }
  }

  // 포스팅 작성 시 사용자 업데이트
const updateFollowingInfo = async (myId, wantFollowId) => {
    try {
      // 사용자 정보 업데이트
      await User.findByIdAndUpdate(myId, { $push: { following: wantFollowId } });
      await User.findByIdAndUpdate(wantFollowId, {$push: {followers:myId}});
    } catch (error) {
      console.error('팔로잉 정보 업데이트 실패:', error);
      throw error;
    }
  };

  const updateUnfollowingInfo = async (myId, wantUnfollowId) => {
    try {
      // 사용자 정보 업데이트
      await User.findByIdAndUpdate(myId, { $pull: { following: wantUnfollowId } });
      await User.findByIdAndUpdate(wantUnfollowId, {$pull: {followers:myId}});
    } catch (error) {
      console.error('언팔로잉 정보 업데이트 실패:', error);
      throw error;
    }
  };

module.exports = {

    follow : async(req,res) => {
        const userToken = req.headers.authorization;
        const wantFollowid=req.params.id;
        // 토큰이 없는 경우 에러를 반환하거나 인증 실패로 처리할 수 있습니다.
        if (!userToken) {
        return res.status(401).json({ error: '인증 실패: 토큰이 필요합니다.' });}
        try {
            
            const myId = await decode(userToken);
            const user = await User.findById(myId);
            if (user.following.includes(wantFollowid)) {
              throw new Error('이미 팔로우한 사용자입니다.');
            }
            await updateFollowingInfo(myId, wantFollowid);
            //const updatedUser = await User.findById(myId);
            res.status(200).json({message:'Successfully followed'})
      }
        catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to follow' });
        }
    
    },

    unfollow: async(req,res) => {
        const userToken = req.headers.authorization;
        const wantUnfollowid=req.params.id;
        if (!userToken) {
            return res.status(401).json({ error: '인증 실패: 토큰이 필요합니다.' });}
            try {
            
                const myId = await decode(userToken);
                const user = await User.findById(myId);
                if (!(user.following.includes(wantUnfollowid))) {
                  throw new Error('팔로우가 되어있지 않은 사용자입니다.');
                }
                await updateUnfollowingInfo(myId, wantUnfollowid);
               // const updatedUser = await User.findById(myId);
                res.status(200).json({message:'Successfully unfollowed'})
          }
            catch(error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to unfollow' });
            }



    },

    getMyInfo : async(req,res) => {
      const userToken = req.headers.authorization;
      try {
      const UserId = await decode(userToken);
      const user = await User.findById(UserId);
      const countFollowing = user.following.length;
      const countFollowers = user.followers.length;
      const countPost = user.posts.length;
      const nickname= user.nickname;
      const bio=user.bio;
      const profileImg=user.profileImg;

      res.status(200).json({nickname,bio,profileImg,countFollowing,countFollowers,countPost});
      }
      catch(error) {
          console.log('Error',error);
          res.status(500).json("error: Failed to count");
      }

  },
    
    getUserInfo: async (req, res) => {
      const userNick = req.params.nickname;
    
      try {
        const user = await User.findOne({ nickname: userNick }).exec();
    
        if (!user) {
          console.log("NO USER FOUND");
          return res.status(404).json({ error: "No user found" });
        }
    
        const countFollowing = user.following.length;
        const countFollowers = user.followers.length;
        const countPost = user.posts.length;
        const nickname = user.nickname;
        const bio = user.bio;
        const profileImg = user.profileImg;
    
        res.status(200).json({
          nickname,
          bio,
          profileImg,
          countFollowing,
          countFollowers,
          countPost,
        });
      } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Failed to retrieve user information" });
      }
    }


}

