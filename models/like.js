const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.objectId,

    },
    likeable: {
        type: mongoose.Schema.objectId,
        required: true,
        refPath : 'onModel'
    },

    onModel: {
        type: String,
        required: true,
        enum:['Post','Comment']


    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;