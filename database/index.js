const mongoose = require("mongoose");
const { urlDb } = require("../app/config");

mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
module.exports = db;
