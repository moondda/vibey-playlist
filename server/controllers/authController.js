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

    const existingEmail = await User.findOne({ email });
    const existingId = await User.findOne({ id });
    const existingNickname = await User.findOne({ nickname });

    if (existingEmail) {
      throw Error('이미 존재하는 이메일입니다.');
    }
    if (existingId) {
      throw Error('이미 존재하는 아이디입니다.');
    }
    if (existingNickname) {
      throw Error('이미 존재하는 닉네임입니다.');
    }

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

  trueToken: async (req, res) => {
    try {
      console.log("라우팅 잘 됨");
      const token = await Token.findOne({
        token: req.params.token,
      });
      console.log(token);
      await User.updateOne({ _id: token.userId }, { $set: { emailVerified: true } });
      await Token.findByIdAndRemove(token._id);
      res.send("이메일이 인증되었습니다.");
    } catch (error) {
      res.status(400).send("에러가 발생하였습니다.")
    }
  }
}

