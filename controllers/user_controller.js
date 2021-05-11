const User = require("../models/user");
const fs = require("fs");
const path = require("path");
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User profile",
      profile_user: user,
    });
  });
};
module.exports.update = async function (req, res) {
 
    if (req.user.id == req.params.id) {
      try{
        let user = await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){
          if(err){
            console.log('********multer error',err);
          }
          user.name = req.body.name;
          user.email = req.body.email;
          if(req.file){
            if(user.avatar){
              fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            //this is saving the path of the updated file into the path of the avatar
            user.avatar = User.avatarPath+'/'+req.file.filename;

          }
          user.save();
          return res.redirect('back');
        });
      }catch(err){
        req.flash('error','err');
        return res.redirect("back");
      }
     
      
    } else {
      return res.status(401).send("Unauthorised");
    }
  
};
//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codiel | signIn",
  });
};

//render the signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codiel | signUp",
  });
};

//get the sign up date
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }

    //if user is not present then create a user.
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user in signing up");
          return;
        }
        return res.redirect("/users/sign-up");
      });
    }

    //if the email id you have used to create an user that already exist in the db then it redirect back to the page
    else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  //TODO later
  req.flash('success','Logged in successfully');
  return res.redirect("/");
};
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success','Logged out successfully');
  return res.redirect("/");
};
