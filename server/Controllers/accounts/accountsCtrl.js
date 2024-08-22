const { json } = require("express");
const Account = require("../../Model/Account");
const User = require("../../Model/User");
const { AppErr } = require("../../utils/appErr");
//! Create Account
const createAccountCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    // Find the logged in user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }
    // Create the account
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });
    // Push the Account into the users accounts field
    userFound.accounts.push(account._id);
    // resave the user
    await userFound.save();
    res.json({ status: "Success", data: account });
  } catch (error) {
    next(error);
  }
};

//! Get all account
const accountsInfoCtrl = async (req, res) => {
  try {
    const accounts = await Account.find().populate("transactions");
    res.json({ accounts });
  } catch (error) {
    res.json(error);
  }
};

//! Get single Account info
const accountInfoCtrl = async (req, res, next) => {
  try {
    //find the id from params
    const { id } = req.params;
    const account = await Account.findById(id).populate("transactions");
    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Delete Account
const deleteAccountCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      data: null,
    });
    res.json({ msg: "Delete Single Accounts Route " });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Update Account
const updateAccountCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  accountsInfoCtrl,
  accountInfoCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
};
