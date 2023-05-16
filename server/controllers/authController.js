const User = require('../models/User');
const validator = require('validator');
const Token = require("../models/Token");
const crypto = require("crypto");
const verifyMail = require('../authEmail.js');

module.exports = {
  signup: async (req, res) => {
    const { name, nickname, id, pw, email, token } = req.body;

    if (!name || !nickname || !id || !pw || !email) {
      throw Error('모든 항목을 입력해주세요.');
    }
    if (!validator.isEmail(email)) {
      throw Error('유효하지 않은 이메일입니다.');
    }
    if (!validator.isStrongPassword(pw)) {
      throw Error('비밀번호가 안전하지 않습니다.');
    }

    // const existingEmail = await User.findOne({ email });
    // const existingId = await User.findOne({ id });
    // const existingNickname = await User.findOne({ nickname });

    // if (existingEmail) {
    //   throw Error('이미 존재하는 이메일입니다.');
    // }
    // if (existingId) {
    //   throw Error('이미 존재하는 아이디입니다.');
    // }
    // if (existingNickname) {
    //   throw Error('이미 존재하는 닉네임입니다.');
    // }

    // 유저 생성
    const user = new User({
      name,
      nickname,
      id,
      pw,
      email,
      token
    });

    // 유저 저장
    await user.save();

    // 이메일 인증 토큰 생성
    const emailToken = new Token(
      { userId: user._id, token: crypto.randomBytes(16).toString('hex') }
    );
    await emailToken.save();

    // 인증 메일 전송
    const link = `http://localhost:5000/valid/email/confirm/${emailToken.token}`;
    await verifyMail(email, link);
    res.status(200).send({ message: "회원가입 인증 메일을 전송했습니다." })
  },

  login: async (req, res) => {
    try {
      const userInfo = await User.findOne({ id: req.body.id });
      console.log(req.body.id);
  
      // 아이디 검증
      if (!userInfo) {
        return res.json({
          loginSuccess: false,
          messsage: "아이디에 해당하는 유저가 없습니다."
        });
      }
  
      // 비밀번호 검증
      const isMatch = await userInfo.comparePassword(req.body.pw);
      if (!isMatch) {
        return res.json({ loginSuccess: false, messsage: "비밀번호가 틀렸습니다." });
      }
  
      // 이메일 인증 여부 검증
      // if (!userInfo.emailVerified) {
      //   return res.json({ message: '이메일 인증을 완료해주십시오.' });
      // }
  
      const user = await userInfo.generateToken();
      res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id, message: '로그인 완료' });
  
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

