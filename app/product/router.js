const express = require("express");
const router = express();
const multer = require("multer");
const os = require("os");
const { createData, getData, updateData, deleteData } = require("./controller");

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

router.get("/products", getData);
router.post("/products", upload.single("image"), createData);
router.get("/products/:id", updateData);
router.delete("/products/:id", deleteData);

module.exports = router;

//   multer({ dest: os.tmpdir() }).single("image"),
