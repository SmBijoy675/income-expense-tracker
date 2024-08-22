const express = require("express");
const {
  createAccountCtrl,
  accountsInfoCtrl,
  accountInfoCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
} = require("../../Controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");
const accountsRoute = express.Router();

//! POST/api/v1/accounts

accountsRoute.post("/", isLogin, createAccountCtrl);

//! GET/api/v1/accounts

accountsRoute.get("/", accountsInfoCtrl);

//! GET/api/v1/accounts/:id

accountsRoute.get("/:id", accountInfoCtrl);

//! DELETE/api/v1/accounts/:id

accountsRoute.delete("/:id", deleteAccountCtrl);

//! PUT/api/v1/accounts/:id

accountsRoute.put("/:id", updateAccountCtrl);

module.exports = accountsRoute;
