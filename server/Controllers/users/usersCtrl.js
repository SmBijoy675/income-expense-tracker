const bcrypt = require("bcryptjs");
const User = require("../../Model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const { model } = require("mongoose");
//! Register
const registerUserCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    // If the user exist by email
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User Already Exist", 400));
    }
    // hash the user pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    // Get resposnse from server
    res.json({
      status: "Success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new AppErr(error, 500));
  }
};

//! Login
const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check if the email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    // Check the password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    res.json({
      status: "Success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error, 500));
  }
};

//! Profile
const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json({ user });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Delete User
const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "Success",
      data: null,
    });
    res.json({ msg: "Delete user Route " });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Update User
const updateUserCtrl = async (req, res, next) => {
  try {
    // Check if the email exist
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return next(
          new AppErr("Email is taken or you already have this email", 400)
        );
      }
    }

    // check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // send the response
      return res.status(200).json({
        status: "Success",
        data: user,
      });
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
