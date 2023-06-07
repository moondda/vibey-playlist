const axios = require("axios");
const router = require("../routes/songRouter");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config({ path: "../variables.env" });

const decode = async (token) => {
  // 토큰 해독
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded; // 토큰에서 추출된 _id 값
    return userId;
  } catch (error) {
    console.error("토큰 해독 실패:", error);
    console.log(token);
    throw error;
  }
};

// 포스팅 작성 시 사용자 업데이트
const updateUserInfo = async (userId, postId) => {
  try {
    // 사용자 정보 업데이트
    await User.findByIdAndUpdate(userId, { $push: { posts: postId } });
  } catch (error) {
    console.error("사용자 정보 업데이트 실패:", error);
    throw error;
  }
};

module.exports = {
  searchsong: async (req, res) => {
    const searchTerm = req.query.term;

    try {
      const response = await axios.get(
        `http://itunes.apple.com/search?limit=1000&term=${searchTerm}&media=music`
      );
      const data = response.data.results;
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  postsong: async (req, res) => {
    const { artist, song, albumCover, mp4, trackId } = req.body;
    const userToken = req.headers.authorization;

    // 토큰이 없는 경우 에러를 반환하거나 인증 실패로 처리할 수 있습니다.
    if (!userToken) {
      return res.status(401).json({ error: "인증 실패: 토큰이 필요합니다." });
    }

    try {
      const id = await decode(userToken);
      console.log(id);

      const postedSong = new Post({
        artist,
        song,
        albumCover,
        mp4,
        trackId,
        postedBy: id,
      });

      const savedSong = await postedSong.save();
      await updateUserInfo(id, savedSong._id);

      res.status(200).json(savedSong);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to post song" });
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.id; // 지우고자 하는 포스트의 ID
    const userId = req.headers.authorization; // 요청을 보낸 사용자의 ID (예: 토큰에서 추출)
    const id = await decode(userId);

    try {
      // 포스트 조회
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "포스트를 찾을 수 없습니다." });
      }

      // 요청한 사용자가 포스트를 작성한 사용자가 아닌 경우 권한 없음 에러 반환
      if (post.postedBy.toString() !== id) {
        return res
          .status(403)
          .json({ error: "포스트를 삭제할 권한이 없습니다." });
      }

      // 포스트 삭제
      await Post.deleteOne({ _id: postId });

      // 사용자 정보 업데이트 (포스트 ID 제거)
      await User.findByIdAndUpdate(id, { $pull: { posts: postId } });

      res.status(200).json({ message: "포스트가 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "포스트 삭제에 실패했습니다." });
    }
  },

  getMyPost: async (req, res) => {
    const userToken = req.headers.authorization;
  
    // 토큰이 없는 경우 에러를 반환하거나 인증 실패로 처리할 수 있습니다.
    if (!userToken) {
      return res.status(401).json({ error: "인증 실패: 토큰이 필요합니다." });
    }
  
    try {
      const userId = await decode(userToken);
  
      const user = await User.findById(userId).populate("posts");
  
      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }
  
      res.status(200).json(user.posts);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "포스트 가져오기에 실패했습니다." });
    }
  }
};
