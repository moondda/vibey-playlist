const express = require('express');
const User=require('../models/User');


module.exports.signup= async (req, res) => {
    const { name,id,pw,email} = req.body;
    
    try {
      // 이메일이 이미 사용중인 경우 예외 처리
      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   return res.status(400).json({ message: '이미 사용중인 이메일입니다.' });
      // }
      
      // 유저 생성
      const user = new User({
        name,
        id,
        pw,
        email
      });
  
      // 유저 저장
      await user.save();
      
      // 성공 메시지 반환
      return res.json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
