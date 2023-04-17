const express = require("express");
const router = express();
const { getInvoice, createInvoice } = require("./controller");

router.get("/invoices", getInvoice);
router.post("/invoices", createInvoice);

module.exports = router;
