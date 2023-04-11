const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeTamps: true,
  }
);
module.exports = mongoose.model("Cart", cartSchema);
