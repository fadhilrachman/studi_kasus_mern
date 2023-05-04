const express = require("express");
const router = express();
const {
  getAllData,
  createData,
  deleteData,
  updateData,
} = require("./controller");
const policyCheck = require("../../utils/authorization");

router.get("/categories", getAllData);
router.post("/categories", createData);
router.put("/categories/:id", updateData);
router.delete("/categories/:id", deleteData);

module.exports = router;
