const express = require("express");
const router = express();
const {
  getAllData,
  createData,
  deleteData,
  updateData,
} = require("./controller");

router.get("/tags", getAllData);
router.post("/tags", createData);
router.put("/tags/:id", updateData);
router.delete("/tags/:id", deleteData);

module.exports = router;
