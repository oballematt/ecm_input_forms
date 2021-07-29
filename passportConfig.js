const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Users } = require("./models")

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = (email, password, done) => {
    Users.findOne({
      where: {
        email
      }
    }).then(function (user) {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            //password is incorrect
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      } else {
        // No user
        return done(null, false, {
          message: "No user with that email address"
        });
      }
    })
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(function (id, done) {

    Users.findByPk(id).then(function (user) {

      if (user) {

        done(null, user.get());

      } else {

        done(user.errors, null);

      }

    });

  });
}

module.exports = initialize;