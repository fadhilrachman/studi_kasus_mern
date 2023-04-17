const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  adress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DelivelyAddress",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orders_total: {
    type: String,
    required: true,
  },
  order: [
    {
      qty: {
        type: Number,
        default: 0,
      },
      produk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Invoices", invoiceSchema);
