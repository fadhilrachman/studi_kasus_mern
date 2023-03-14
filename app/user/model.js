const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "panjang karakter minimal 6"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //   validate: {
      //     validator: (v) => {},
      //     message: (props) => `${props.value} bukan alamat email yang valid!`,
      //   },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    token: String,
  },
  {
    timestamps: true,
  }
);

userSchema.path("email").validate(
  (val) => {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val);
  },
  (attr) => `${attr.value} bukan email yang valid`
);

userSchema.path("email").validate(
  async function (val) {
    try {
      const count = await this.model("User").count({ email: val });

      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `email sudah terdaftar`
);

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = mongoose.model("User", userSchema);
