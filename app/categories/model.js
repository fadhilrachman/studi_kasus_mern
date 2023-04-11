const mongoose = require("mongoose");
const Product = require("../product/model");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "Panjang nama kategori maksimal 20 karakter"],
    minLength: [3, "Panjang nama kategori minimal 3 karakter"],
  },
});
categorySchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    const category = this;
    await Product.deleteMany({ category: category._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Categories", categorySchema);
