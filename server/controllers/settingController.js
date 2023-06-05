const User = require('../models/User');
const { Storage } = require('@google-cloud/storage');

// Google Cloud Storage 설정
const storage = new Storage({
    projectId: 'local-citizen-310006', // 구글 클라우드 프로젝트 ID 입력
    keyFilename: './local-citizen-310006-b88c70d0dbca.json' // 서비스 계정 키 파일의 경로 입력
});
const bucket = storage.bucket('vibey'); // 구글 클라우드 스토리지 버킷 이름 입력

module.exports = {
    check: async (req, res) => {
        try {
            const loginUser = await User.findOne({
                token: req.cookies.x_auth
            });

            const isMatch = await loginUser.comparePassword(req.body.pw);

            if (isMatch) {
                return res.json({ result: true, message: "비밀번호가 일치합니다." });
            } else {
                return res.json({ result: false, message: "비밀번호가 일치하지 않습니다." });
            }

        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },

    password: async (req, res) => {
        try {
            const loginUser = await User.findOne({
                token: req.cookies.x_auth
            });

            loginUser.pw = req.body.pw
            loginUser.save()

            return res.json({ result: true, message: "비밀번호가 변경되었습니다." });
        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },

    bio: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const { bio } = req.body;

            const user = await User.findOne({ token });

            if (!user) {
                return res.json({ result: false, message: "사용자를 찾을 수 없습니다" })
            }

            if (!user.bio && bio) {
                user.bio = bio;
                await user.save();
            } else if (user.bio !== bio) {
                user.bio = bio;
                await user.save();
            }


            return res.json({ result: true, message: "한 줄 소개가 변경되었습니다." });
        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },

    nickname: async (req, res) => {
        try {
            await User.updateOne({ token: req.headers.authorization }, { $set: { nickname: req.body.nickname } });

            return res.json({ result: true, message: "닉네임이 변경되었습니다." });
        } catch (error) {

            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },

    profileImg: async (req, res) => {
        const file = req.file;
        const userLogged = req.cookies.x_auth;

        if (!file || !userLogged) {
            return res.status(400).send('Missing file or user');
        }

        const uploadToGCS = async () => {
            const gcsFileName = Date.now() + '_' + file.originalname;
            const gcsFilePath = `profileImg/${gcsFileName}`;

            const uploadOptions = {
                destination: gcsFilePath,
                public: true
            };

            // 이미지를 Google Cloud Storage에 업로드
            await bucket.upload(file.path, uploadOptions);

            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFilePath}`;

            // MongoDB에 이미지 URL 업데이트
            await User.updateOne(
                { token: req.cookies.x_auth },
                { $set: { profileImg: imageUrl } }
            );

            return res.json({ result: true, message: "프로필 사진 업로드가 완료되었습니다." })

        };

        uploadToGCS().catch(err => {
            console.error(err);
            return res.json({ result: false, message: "프로필 사진 업로드가 실패하였습니다." })
        });
    },
}