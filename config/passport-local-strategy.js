const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback:true
    },
    function (req,email, password, done) {
      //find a user and establish it's identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash('error',err);
          return done(err);
        }

        if (!user || user.password != password) {
          req.flash('error',"Invalid username and password");
          console.log("Invalid user name and password");

          // If the credentials are not valid (for example, if the password is incorrect), done should be invoked with false instead of a user to indicate an authentication failure.
          return done(null, false);
        }
        // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user ----> Passport");
      return done(err);
    } else {
      return done(null, user);
    }
  });
});

//check fi the author is autheticated

passport.checkAuthentication = function (req, res, next) {

  if(req.isAuthenticated()){
    return next();
  }

  return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
      //req.user containes the current signed in user from the session cookie and we are
      //just sending to the locals for views
      res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
