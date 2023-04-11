const express = require("express");
const router = express();
const { getAllDatta, createData, deleteData } = require("./controller");

router.get("/cart", getAllDatta);
router.post("/cart", createData);
router.delete("/cart", deleteData);

module.exports = router;
