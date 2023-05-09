const express = require('express');
const User = require('../models/User');
const validator = require('validator');
// var valid = require('./validController');


module.exports.signup = async (req, res) => {
  const { name, nickname, id, pw, email, token} = req.body;

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

  if (existingEmail){
    throw Error('이미 존재하는 이메일입니다.');
  }
  if (existingId){
    throw Error('이미 존재하는 아이디입니다.');
  }
  if (existingNickname){
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

  // 성공 메시지 반환
  return res.json({ message: '회원가입이 완료되었습니다.' });
} 
// catch (error) {
//   console.error(error);
//   return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
// };

