const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config(); // .env 파일에서 환경 변수를 로드합니다.

// 본인 Gmail 계정
const GMAIL = process.env.EMAIL_SERVICE;
const EMAIL = process.env.USER;
const EMAIL_PW = process.env.PASSWORD;

// transport 생성
const verifyMail = async (email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: GMAIL,
            auth: {
                user: EMAIL,
                pass: EMAIL_PW,
            },
        });
        // email 전송
        let info = await transporter.sendMail({
            // 전송할 email 내용 작성
            from: EMAIL,
            to: email,
            subject: "Vibey 회원가입을 위한 인증 메일입니다.",
            text: "Welcome",
            html: `
            <div>
            <a href="${link}">회원가입을 완료하기 위해 여기를 클릭해주세요.</a>
            </div>
            ` // mail 내용
        });
        console.log("메일이 성공적으로 전송되었습니다.");
    } catch (error) {
        console.log(error, "메일 전송이 실패하였습니다.")
    }
};

module.exports = verifyMail;