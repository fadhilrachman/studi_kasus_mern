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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      return res
        .status(404)
        .json({ message: "email belum terdaftar", error: "email" });

    bcrypt.compare(password, checkUser?.password, async (err, isMatch) => {
      console.log({ isMatch });
      console.log({ err });

      if (isMatch) {
        const token = await jwt.sign({ email }, process.env.refToken, {
          expiresIn: "1d",
        });
        await User.findOneAndUpdate({ email }, { token }, { new: true });

        return res.json({ message: "login success", token });
      } else {
        return res
          .status(401)
          .json({ message: "password error", error: "password" });
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    console.log({ token });
    if (token == null) return res.sendStatus(401);
    await jwt.verify(token, process.env.refToken, async (err, decode) => {
      if (err) return res.sendStatus(403);

      const user = await User.findOneAndUpdate(
        { email: decode.email },
        { token: null },
        { new: true }
      );
      await res.clearCookie("token");
      res.json(user);
    });
    // await User.findOneAndUpdate({ token: null });
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res, next) => {
  const { isLogin } = req.query;
  const token = req.headers["authorization"];
  console.log({ token: process.env.refToken });
  try {
    if (isLogin) {
      await jwt.verify(token, process.env.refToken, async (err, decode) => {
        console.log({ decode, token });
        if (err) return res.sendStatus(403);
        const result = await User.findOne({ email: decode.email }).select(
          "email username role"
        );
        return res.status(200).json({ message: "succes get data", result });
      });
    }
    const result = await User.find();
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getData, login, logout };
