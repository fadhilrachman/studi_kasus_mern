const express = require("express");
const router = express();
const {
  getAllData,
  createData,
  deleteData,
  updateData,
} = require("./controller");
const policyCheck = require("../../utils/authorization");

router.get("/categories", policyCheck("view", "category"), getAllData);
router.post("/categories", policyCheck("create", "category"), createData);
router.put("/categories/:id", updateData);
router.delete("/categories/:id", deleteData);

module.exports = router;
