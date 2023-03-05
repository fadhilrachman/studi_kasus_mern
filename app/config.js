const dotenv = require("dotenv").config();
const path = require("path");

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  urlDb: process.env.urlDb,
};
