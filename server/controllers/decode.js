const jwt = require('jsonwebtoken');

// 비밀 키
const secretKey = 'secretToken';

const decode = (token) => {
// 토큰 해독
try {
  const decoded = jwt.verify(token, secretKey);
  const userId = String(decoded); // 토큰에서 추출된 _id 값

  console.log(userId); // _id 값 출력
} catch (error) {
  console.error('토큰 해독 실패:', error);
  console.log(token);
}
}

decode("eyJhbGciOiJIUzI1NiJ9.NjQ3NGE1MTBiMGNhOWUzNjE0Njc4OWEx.njcxe_uwoRSdtm3YLHPbg1Pw7CoU2LbOa8AWrrT2Wfg");

module.exports=decode;
