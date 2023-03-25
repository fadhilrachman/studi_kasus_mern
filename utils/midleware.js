const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../app/user/model");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  //   console.log(token);
  //   console.log(process.env.refToken);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.refToken, async (err, decode) => {
    if (err) return res.sendStatus(403);
    // req.email = decode.email;

    const user = await User.findOne({ email: decode.email });
    console.log(token);
    console.log(user.token);
    if (token != user.token) {
      return res.sendStatus(403);
    }
    next();
  });
};

module.exports = verifyToken;
