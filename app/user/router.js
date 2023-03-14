const express = require("express");
const router = express();
const { register, getData, login } = require("./controller");

router.get("/user", getData);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
