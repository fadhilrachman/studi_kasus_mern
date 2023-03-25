const express = require("express");
const router = express();
const { register, getData, login, logout } = require("./controller");
const bcrypt = require("bcrypt");
const User = require("./model");
const passport = require("passport");

router.get("/user", getData);

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

module.exports = router;
