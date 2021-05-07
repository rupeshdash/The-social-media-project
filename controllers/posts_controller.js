const Post = require("../models/post");
const Comment = require("../models/comment");

//async await converted
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
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
