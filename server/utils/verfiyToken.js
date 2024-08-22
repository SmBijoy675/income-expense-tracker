const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "anykey");
    return decoded;
  } catch (err) {
    return false;
  }
};

module.exports = verifyToken;
