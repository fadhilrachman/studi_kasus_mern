const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const productsRouter = require("./app/product/router");
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file);
//     cb(null, "images/products");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(cors({ allowedHeaders: "*" }));
// app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(productsRouter);

// error handler

module.exports = app;
