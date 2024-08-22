const Account = require("../../Model/Account");
const Transaction = require("../../Model/Transaction");
const User = require("../../Model/User");
const { AppErr } = require("../../utils/appErr");
//! Create transaction
const trasactionCreateCtrl = async (req, res, next) => {
  const { name, amount, category, notes, transactionType, account } = req.body;
  try {
    // Find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }
    // Find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(new AppErr("Account no found", 404));
    }
    // Create the transaction
    const transaction = await Transaction.create({
      amount,
      transactionType,
      notes,
      category,
      name,
      account,

      createdBy: req.user,
    });
    // Push the transaction
    accountFound.transactions.push(transaction._id);
    // Resave the account
    await accountFound.save();
    res.json({ status: "Success", data: transaction });
  } catch (error) {
    next(new AppErr(error));
  }
};

//! Get all Transactions info
const getTranactionsInfoCtrl = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      status: "Success",
      data: transactions,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Get single transactions info
const getSingleTransactionInfoCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.status(200).json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Delete transaction
const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//! Update transaction
const updateTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  trasactionCreateCtrl,
  getTranactionsInfoCtrl,
  getSingleTransactionInfoCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
