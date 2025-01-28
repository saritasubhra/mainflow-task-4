const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      fullname,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      message: "User created successsfully",
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, logIn };
