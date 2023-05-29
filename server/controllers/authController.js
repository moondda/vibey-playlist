const User = require('../models/User');
const Token = require("../models/Token");
const validator = require('validator');

module.exports = {
  signup: async (req, res) => {
    const { name, nickname, id, pw, email } = req.body;

    if (!name || !nickname || !id || !pw || !email) {
      return res.json({ message: '모든 항목을 입력해주세요.' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ message: '유효하지 않은 이메일입니다.' });
    }
    if (!validator.isStrongPassword(pw)) {
      return res.json({ message: "비밀번호가 안전하지 않습니다." });
    }

    const userInfo = await Token.findOne({ email: req.body.email });
    console.log(userInfo)

    // 이메일 인증 여부 검증
    if (userInfo && userInfo.emailVerified) {

      // 유저 생성
      const user = new User({
        name,
        nickname,
        id,
        pw,
        email,
      });

      // 유저 저장
      await user.save()

      return res.json({ result: true, message: "회원가입이 완료되었습니다." })
    }
    else {
      return res.json({ result: false, message: "이메일 인증을 완료해주십시오." });
    }
  },

  login: async (req, res) => {
    try {
      const userInfo = await User.findOne({ id: req.body.id });
      console.log(req.body.id);

      // 아이디 검증
      if (!userInfo) {
        return res.json({
          loginSuccess: false,
          message: "아이디에 해당하는 유저가 없습니다."
        });
      }

      // 비밀번호 검증
      const isMatch = await userInfo.comparePassword(req.body.pw);
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
      }

      // 로그인
      const user = await userInfo.generateToken();
      res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id, message: '로그인 완료' });

    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
