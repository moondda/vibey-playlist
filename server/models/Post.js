const mongoose = require('mongoose');

const postSchema = new mongoose.Schema( {
    song : {type: String, required:true},
    artist: {type: String, required:true},
    albumCover: {type:String},
    mp4: { type: String, required: true },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}

})

module.exports = mongoose.model('Post', postSchema);