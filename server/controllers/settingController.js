const User = require('../models/User');

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

            return res.json({ result: true, message: "비밀번호가 변경되었습니다."});
        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    bio: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const {bio} = req.body;

            const user = await User.findOne({token});

            if(!user) {
                return res.json({result: false, message: "사용자를 찾을 수 없습니다"})
            }

            if (!user.bio && bio) {
                user.bio = bio;
                await user.save();
            } else if (user.bio !== bio) {
                user.bio = bio;
                await user.save();
            }


            return res.json({ result: true, message: "한 줄 소개가 변경되었습니다."});
        } catch(error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included"});
        }
    },

    nickname: async (req, res) => {
        try {
            await User.updateOne({ token: req.headers.authorization }, { $set: { nickname: req.body.nickname } });

            return res.json({ result: true, message: "닉네임이 변경되었습니다."});
        } catch(error) {
            
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },

    profileImg: async (req, res) => {
        try {
            const imgfile = req.file;
            console.log(imgfile);

            await User.updateOne({ token: req.cookies.x_auth }, { $set: { profileImg: req.file.path } });
            return res.json({ result: true, profileImg, message: "프로필 사진이 변경되었습니다." });

        } catch (error) {
            return res.json({ result: false, code: "INVALID_PARAMETER", message: "Invalid parameter included" });
        }
    },
}