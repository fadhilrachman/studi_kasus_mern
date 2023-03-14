const express = require("express");
const router = express();
const {
  getAllData,
  createData,
  deleteData,
  updateData,
} = require("./controller");

router.get("/address", getAllData);
router.post("/address", createData);
router.put("/address/:id", updateData);
router.delete("/address/:id", deleteData);

module.exports = router;
