// const Like = require('../models/like');
// const Comment = require('../models/comment');
// const Post = require('../models/post');
// const { populate } = require('../models/like');


// module.exports.toggleLike = async function(req,res){
//     try{

//         //likes/toggle/?id=abcdef&type=Post

//         let likeable;
//         let deleted = false;

//         if(req.query.type == 'Post'){
//             likeable = await Post.findById(req,query.id).populate('likes');

//         }else{
//             likeable = await (await Comment.findById(req.query.id)).populate('likes')
//         }


//         //check if like exists already
        
//         let existingLike = await Like.findOne({
//             likeable: req.query.id,
//             onModel: req.query.type,
//             user: req.user._id
//         });

//         //if a like already exist delete it else make a new like
//         if(existingLike){
//             likeable.likes.pull(existingLike._id);
//             likeable.save();

//             existingLike.remove();
//             deleted = true;
//         }else{
//             let newLike = await Like.create({
//                 user: res.user._id,
//                 likeable: req.query.id,
//                 onModel: req.query.type
//             });

//             likeable.likes.push(newLike._id);
//             likeable.save();
//         }

//         return res.json(200,{
//             message: "Request successful!",
//             data:{
//                 deleted : deleted
//             }
//         })


//     }catch(err){
//         console.log(err);
//         return res.json(500,{
//             message: "Internal server error",
            
//         });
//     }
// }