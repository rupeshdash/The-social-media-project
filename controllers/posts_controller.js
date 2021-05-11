const Post = require("../models/post");
const Comment = require("../models/comment");

//async await converted
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    
    if(req.xhr){

      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate('user','name').execPopulate();
      return res.status(200).json({

        
        data: {
          post : post
        },
        messege: "post created!!!"
      })
    }
    req.flash('success','Post added successfully!!!');
    return res.redirect("back");
  } catch (err) {
    req.flash('error','can not be posted');
    return;
  }
};

//async cnverted
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //.id means converting obj id into string
    if (post.user == req.user.id) {
      post.remove();
      let comment = await Comment.deleteMany({ post: req.params.id });

      if(req.xhr){
        
        return res.status(200).json({
            data:{
              post:post
            },
            messege:"Post deleted successfully!!"
        })
      }


      req.flash('success','Post and associated comments are deleted')
      return res.redirect("back");
    } else {
      req.flash('error','You are not authorized to delete this post!');
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error','You are not authorized to delete this post!');
    return;
  }
};
