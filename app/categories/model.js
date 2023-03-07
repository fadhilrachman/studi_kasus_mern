const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "Panjang nama kategori maksimal 20 karakter"],
    minLength: [3, "Panjang nama kategori minimal 3 karakter"],
  },
});

module.exports = mongoose.model("Categories", categorySchema);
