const User = require("./model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;

const register = async (req, res, next) => {
  const { password, confirm_password } = req.body;

  try {
    if (password != confirm_password)
      return res.status(400).json({ message: "password error" });

    const result = await User.create(req.body);

    res.status(201).json({
      message: "register succes",
      result,
    });
  } catch (error) {
    res.json(error);
  }
};
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      // cek email
      try {
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
      } catch (error) {
        done(error, null);
      }
      done();
    }
  )
);
passport.serializeUser(async function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const login = (req, res) => {
  const { email, password } = req.body;
  try {
    passport.authenticate("local", async (err, user) => {
      if (user) {
        const userObj = user.toObject();
        console.log("ini user baru ", user);

        const token = await jwt.sign(
          { email, password },
          process.env.refToken,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        await User.findByIdAndUpdate(user._id, { token });
        return res.status(200).json({ message: "succes login", token });
      }
    })(req, res);
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getData, login };
