const express = require("express");
const router = express();
const multer = require("multer");
const os = require("os");
const { createData, getData, updateData, deleteData } = require("./controller");
require("dotenv").config();
const verifyToken = require("../../utils/midleware");
const policyCheck = require("../../utils/authorization");
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter,
});

router.get("/products", getData);
router.post("/products", upload.single("image"), createData);
router.put("/products/:id", upload.single("image"), updateData);
router.delete("/products/:id", deleteData);

module.exports = router;
// policyCheck("view", "product")
//   multer({ dest: os.tmpdir() }).single("image"),
