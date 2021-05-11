const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // Post.find({},function(err,posts){
  //     res.render('home',{
  //         title:'Codeial | Home',
  //         posts:  posts
  //     });
  // });

  //populate the user of each posts by async await
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});
    res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error is populating", err);
    return;
  }
};

// module.exports.profile = function(req,res){
//     return res.end("<h1>Whoa!! Youa re inside profile!!!</h1>")
// }
