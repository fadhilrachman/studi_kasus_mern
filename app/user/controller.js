const User = require("./model");
const bcrypt = require("bcrypt");
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
    const validationGmail = await User.findOne({ email });
    if (!validationGmail) {
      return res.status(404).json({ message: "email belum terdaftar" });
    }
    const validationPassword = await bcrypt.compare(
      password,
      validationGmail.password
    );

    if (!validationPassword) {
      return res.status(404).json({ message: "password error" });
    }
    res.status(200).json({ mesage: "login succes", result: validationGmail });
  } catch (error) {
    res.json(error);
  }
};

const getData = async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {}
};

module.exports = { register, getData, login };
