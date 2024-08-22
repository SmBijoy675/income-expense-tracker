const { AppErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verfiyToken");
const isLogin = (req, res, next) => {
  // get token from req header
  const token = getTokenFromHeader(req);
  // verify
  const decodedUser = verifyToken(token);
  // save the user into the req obj
  req.user = decodedUser.id;

  if (!decodedUser) {
    return next(new AppErr("Invalid or Expire token, Please login again", 401));
  }
  next();
};

module.exports = isLogin;
