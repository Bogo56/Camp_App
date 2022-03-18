const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../model/userModel");

// This is the Passport(framework) configuration for username/password authentication('local')
// this is what runs internally when the "passport.authenticate" middleware is added to a route

// How the user is going to be validated( All of this comes from the docs)
passport.use(
  new LocalStrategy(
    // expects username and passsword field names on the form(e.g req.body)
    function (username, password, done) {
      userModel
        .findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Wrong username or password",
            });
          }
          // static method on the model for comparing hashed password(using bcrypt)
          userModel
            .validatePass(password, user.password)
            .then((isValid) => {
              if (isValid) {
                // if valid send the user object to "passport.serializeUser()" to store it in the session
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Wrong username or password",
                });
              }
            });
        })
        .catch((er) => done(er));
    }
  )
);

// on receiving the user object this method takes only the id and stores it in the session cookie
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// this get's invoked when we access the req.user(crated by 'serializeUser()') property, which gets populated using the id from "serializeUser()"
passport.deserializeUser((id, done) => {
  userModel
    .findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
