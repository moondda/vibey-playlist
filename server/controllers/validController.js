const User = require('../models/User');
const validator = require('validator');
const Token = require("../models/Token");
const crypto = require("crypto");
const verifyMail = require('../authEmail.js');

module.exports = {
    email: async (req, res) => {
        try {
            email = req.body.email;
            const existingEmail = await User.findOne({ email });

            if (validator.isEmail(email)) {
                if (existingEmail) {
                    return res.json({ result: false, messsage: "이미 존재하는 이메일입니다." });
                }
                else {
                    return res.json({ result: true });
                }
            } else {
                return res.json({ result: false, messsage: '유효하지 않은 이메일입니다.' });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included", errors: res.json({field: "email", message: "이메일은 필수 입력사항 입니다."})});
        }
    },

    id: async (req, res) => {
        try {
            id = req.body.id;
            const existingId = await User.findOne({ id });

            if (existingId) {
                return res.json({ result: false, messsage: "이미 존재하는 아이디입니다." });
            }
            else{
                return res.json({ result: true });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included", errors: res.json({field: "id", message: "아이디는 필수 입력사항 입니다."})});
        }
    },

    nickname: async (req, res) => {
        try {
            nickname = req.body.nickname;
            const existingNickname = await User.findOne({ nickname });

            const myRe = /^[a-z0-9_-]{2,10}$/;
            if (myRe.test(nickname)){
                if (existingNickname) {
                    return res.json({ result: false, messsage: "이미 존재하는 닉네임입니다." });
                }
                else{
                    return res.json({ result: true });
                }
            } else {
                return res.json({ result: false, messsage: "닉네임은 특수문자를 제외한 2~10자리여야 합니다." });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included", errors: res.json({field: "nickname", message: "닉네임은 필수 입력사항 입니다."})});
        }
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
      },
};