const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "user_profile",
    user: "Rupesh",
  });
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
  if (req.body.password == req.body.confirm_password) {
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
};
