const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    nickname: { type: String },
    id: { type: String },
    pw: { type: String },
    email: { type: String },
    token: { type: String },
    emailVerified: { type: Boolean, default:false },
    bio: { type: String }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    let user = this; // userSchema

    // password가 변환될 때만 암호화
    if (user.isModified('pw')) {
        // salt 만들기
        bcrypt.genSalt(saltRounds, function (err, salt) {
            // salt 만들기 실패 next는 바로 register route save로 감.
            if (err) return next(err);

            // 암호화
            bcrypt.hash(user.pw, salt, function (err, hash) {
                if (err) return next(err); // 해쉬 실패

                user.pw = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword) {
    const self = this;
    return bcrypt.compare(plainPassword, self.pw);
};

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    try {
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.findByToken = function (token) {
    var user = this;

    // 비동기 작업에 따라 해결(resolve)하거나 거부(reject)하는 프라미스를 반환합니다.
    return new Promise((resolve, reject) => {
        // 토큰을 검증합니다.
        jwt.verify(token, "secretToken", function (err, decoded) {
            if (err) {
                return reject(err);
            }

            // 디코딩된 ID와 토큰을 사용하여 사용자를 찾습니다.
            user.findOne({ "_id": decoded, "token": token })
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    });
};

module.exports = mongoose.model('User', userSchema, 'users');