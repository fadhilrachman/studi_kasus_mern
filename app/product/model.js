const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "panjang minimal 3 karakter"],
    },
    description: {
      type: String,
      maxLength: [1000, "panjang maksimal 1000 karakter"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
