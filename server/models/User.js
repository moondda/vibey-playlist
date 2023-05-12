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
    emailVerified: { type: String, default:false }
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

module.exports = mongoose.model('User', userSchema, 'users');