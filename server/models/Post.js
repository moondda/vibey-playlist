const mongoose = require('mongoose');

const postSchema = new mongoose.Schema( {
    title : {type: String, required:true},
    artist: {type: String, required:true},
    albumCover: {type:String},
    createdAt : {type:Date, default: Date.now} , 
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'}

})

module.exports = mongoose.model('Post', postSchema, 'users');