const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must have atleast 8 characters."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
