const express = require("express");
const router = express();
const multer = require("multer");
const os = require("os");
const { createData } = require("./controller");

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
    console.log(file);
    cb(null, "images/products");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter,
});
router.post("/products", upload.single("image"), createData);

module.exports = router;

//   multer({ dest: os.tmpdir() }).single("image"),
