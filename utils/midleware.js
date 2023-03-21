const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  //   console.log(token);
  console.log(process.env.refToken);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.refToken, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.email = decode.email;
    // console.log(req.email);
    next();
  });
};

module.exports = verifyToken;
