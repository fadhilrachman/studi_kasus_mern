const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const productsRouter = require("./app/product/router");
const categoriesRouter = require("./app/categories/router");
const tagsRouter = require("./app/tags/router");
const userRouter = require("./app/user/router");
const addressRouter = require("./app/deliveryAddres/router");
const cartRouter = require("./app/cart/router");
const invoiceRouter = require("./app/invoices/router");
const verifyToken = require("./utils/midleware");
app.use(cors({ allowedHeaders: "*" }));

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(productsRouter);
app.use(categoriesRouter);
app.use(tagsRouter);
app.use(userRouter);
app.use(verifyToken);
app.use(cartRouter);
app.use(invoiceRouter);
app.use(addressRouter);

// error handler

module.exports = app;
