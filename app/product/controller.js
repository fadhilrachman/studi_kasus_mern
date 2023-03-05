const path = require("path");
const fs = require("fs");
const Product = require("./model");
const config = require("../config");

const createData = async (req, res, next) => {
  // Dapatkan informasi mengenai file yang di-upload
  const file = req.file.path;

  // Lakukan operasi yang diperlukan dengan file tersebut
  res.json(file);
};

module.exports = { createData };
