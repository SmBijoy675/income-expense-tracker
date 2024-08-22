const express = require("express");
const {
  trasactionCreateCtrl,
  getTranactionsInfoCtrl,
  getSingleTransactionInfoCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../Controllers/transactions/transactionsCtrl");
const isLogin = require("../../middlewares/isLogin");
const transactionsRoute = express.Router();

//! POST/api/v1/transactions

transactionsRoute.post("/", isLogin, trasactionCreateCtrl);

//! GET/api/v1/transactions

transactionsRoute.get("/", getTranactionsInfoCtrl);

//! GET/api/v1/transactions/:id
transactionsRoute.get("/:id", getSingleTransactionInfoCtrl);

//! DELETE/api/v1/transactions/:id
transactionsRoute.delete("/:id", deleteTransactionCtrl);

//! PUT/api/v1/transactions/:id
transactionsRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionsRoute;
