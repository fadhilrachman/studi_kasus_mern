const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const productsRouter = require("./app/product/router");
const categoriesRouter = require("./app/categories/router");
const tagsRouter = require("./app/tags/router");

app.use(cors({ allowedHeaders: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(productsRouter);
app.use(categoriesRouter);
app.use(tagsRouter);

// error handler

module.exports = app;
