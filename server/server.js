const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const usersRoute = require("./route/users/usersRoute");
const accountsRoute = require("./route/accounts/accountsRoute");
const transactionsRoute = require("./route/transactions/transactionsRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");
const app = express();

//! middlewares
app.use(express.json()); //pass incoming data

//! Corse middleware
app.use(cors());

//! routes

//! users route
app.use("/api/v1/users", usersRoute);

//! account creation route

app.use("/api/v1/accounts", accountsRoute);

//! transaction route

app.use("/api/v1/transactions", transactionsRoute);

//! error handlers
app.use(globalErrHandler);

//! listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on port:${PORT}`));
