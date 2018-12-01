//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport against
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, username, password, done) {
      // console.log(`loggin in with email: ${username} \n and password: ${password}`)
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: username
        }
      }).then(function(dbUser) {
        // console.log(dbUser)
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// serialize determines what to store in the session data so we are storing email, ID and firstName
passport.serializeUser(function(user, done) {
  console.log(`\n\n        serializing ${user.id}\n`)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(`\n\n        DEserializing ${id}\n`)
  db.User.findOne({where: {id:id}}).then( function(user, err) {
    console.log(`\n user is ${user}`)
    console.log(`\n error is ${err}`)
    done(err, user);
  });
});
// Exporting our configured passport
module.exports = passport;
