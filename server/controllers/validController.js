const User = require('../models/User');
const validator = require('validator');
const Token = require("../models/Token");
const crypto = require("crypto");
const verifyMail = require('../authEmail.js');

module.exports = {
    email: async (req, res) => {
        try {
            email = req.body.email;
            if (email == ""){
                return res.json({ result: false, message: "이메일은 필수 입력 사항입니다." });
            }
            const existingEmail = await User.findOne({ email });

            if (validator.isEmail(email)) {
                if (existingEmail) {
                    return res.json({ result: false, message: "이미 존재하는 이메일입니다." });
                }
                else {
                    return res.json({ result: true });
                }
            } else {
                return res.json({ result: false, message: '유효하지 않은 이메일입니다.' });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    id: async (req, res) => {
        try {
            id = req.body.id;
            if (id == ""){
                return res.json({ result: false, message: "아이디는 필수 입력 사항입니다." });
            }
            const existingId = await User.findOne({ id });

            if (existingId) {
                return res.json({ result: false, message: "이미 존재하는 아이디입니다." });
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
                return res.json({ result: false, message: "닉네임은 필수 입력 사항입니다." });
            }
            const existingNickname = await User.findOne({ nickname });
            const nickCheck = /^[a-z0-9_-]{2,10}$/;
            if (nickCheck.test(nickname)){
                if (existingNickname) {
                    return res.json({ result: false, message: "이미 존재하는 닉네임입니다." });
                }
                else{
                    return res.json({ result: true });
                }
            } else {
                return res.json({ result: false, message: "닉네임은 특수문자를 제외한 2~10자리여야 합니다." });
            }

        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    confirm: async (req, res) => {
        try {
          const token = await Token.findOne({
            token: req.params.token,
          });
            console.log(token);
            await User.updateOne({ email: token.email }, { $set: { emailVerified: true } });
            await Token.findByIdAndRemove(token.email);
            res.send("이메일이 인증되었습니다.");
        } catch (error) {
            res.status(400).send("에러가 발생하였습니다.")
        }
    },

    check: async (req, res) => {
        try {
            const userInfo = await User.findOne({ email: req.body.email });
            if (req.body.email === ""){
                return res.json({ result: false, message: "이메일은 필수 입력 사항입니다." });
            }
            if (userInfo.emailVerified){
                return res.json({ result: true, message: "인증된 이메일입니다." });
            } else {
                return res.json({ result: false, message: "인증되지 않은 이메일입니다."});
            }
        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    send: async (req, res) => {
        try {

            const email = req.body.email;
            
            // 이메일 인증 토큰 생성
            const emailToken = new Token(
                { email: email, token: crypto.randomBytes(16).toString('hex') }
            );
            console.log(emailToken)
            await emailToken.save();

            // 인증 메일 전송
            const link = `http://localhost:5000/valid/email/confirm/${emailToken.token}`;
            await verifyMail(email, link);
            res.status(200).send({ result: true, message: "회원가입 인증 메일을 전송했습니다." })

        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },
};