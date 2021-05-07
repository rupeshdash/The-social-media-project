const Post = require("../models/post");
const Comment = require("../models/comment");

//async await converted
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Can nopt creaye post", err);
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
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in deleting the post");
    return;
  }
};
