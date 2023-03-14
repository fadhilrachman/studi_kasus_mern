const mongoose = require("mongoose");

const AlamatSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    kabupaten: {
      type: String,
      required: true,
    },
    kecamatan: {
      type: String,
      required: true,
    },
    kelurahan: {
      type: String,
      required: true,
    },
    detail_alamat: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DelivelyAddress", AlamatSchema);
