const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema ({
    email: {
        type : String,
        ref: "User",
        required: true,
    },
    token: {
        type : String,
        required: true,
    },
    emailVerified: {
        type: Boolean, 
        default: false
    },
});
const Token = mongoose.model("token", tokenSchema);
module.exports = Token;