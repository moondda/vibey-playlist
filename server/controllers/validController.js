const User = require('../models/User');
const validator = require('validator');
const Token = require("../models/Token");

module.exports = {
    email: async (req, res) => {
        try {
            email = req.body.email;
            if (email == ""){
                return res.json({ result: false, messsage: "이메일은 필수 입력 사항입니다." });
            }
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
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    id: async (req, res) => {
        try {
            id = req.body.id;
            if (id == ""){
                return res.json({ result: false, messsage: "아이디는 필수 입력 사항입니다." });
            }
            const existingId = await User.findOne({ id });

            if (existingId) {
                return res.json({ result: false, messsage: "이미 존재하는 아이디입니다." });
            }
            else{
                return res.json({ result: true });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    nickname: async (req, res) => {
        try {
            nickname = req.body.nickname;
            if (nickname == ""){
                return res.json({ result: false, messsage: "닉네임은 필수 입력 사항입니다." });
            }
            const existingNickname = await User.findOne({ nickname });
            const nickCheck = /^[a-z0-9_-]{2,10}$/;
            if (nickCheck.test(nickname)){
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
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    trueToken: async (req, res) => {
        try {
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