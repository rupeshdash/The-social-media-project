const User = require("../models/user");
module.exports.profile = function (req, res) {
   if(req.cookies.user_id){
      User.findById(req.cookies.user_id,function(err,user){
        if(user){
          return res.render("user_profile", {
            title: "user_profile",
            user: user
          });
        }else{
          return res.redirect('/users/sign-in');
        }
      })

   }else{
     return res.redirect('/users/sign-in');
   }
  
};

//render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codiel | signIn",
  });
};

//render the signUp page
module.exports.signUp = function (req, res) {
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

  //find the user
  User.findOne({email: req.body.email},function(err,user){

    if(err){console.log("Error in creating user in signing in"); return;}


    //handle user found
    if(user){
      //handle password which don't match
      if(user.password!=req.body.password){
        return res.redirect('back');
      }


      //handle session creation
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');


    }else{
      //handle user not found
      return res.redirect('back');

    }

  });
};


//for sign-out functionality just delete the cookie by res.clearCookie function
module.exports.endSession = function(req,res){
    
  res.clearCookie('user_id');
  return res.redirect('/users/sign-in');


};

