const LocalStrategy = require("passport-local").Strategy;
const User = require("./model");
const bcrypt = require("bcrypt");
module.exports = async () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // cek email
        const user = await User.findOne({ email });
        if (!user) return done(null, false, "email tidak terdaftar");

        // cek pasword
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "password salah" });
          }
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
