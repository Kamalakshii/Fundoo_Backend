const jwt = require("jsonwebtoken");
module.exports = {
  GenerateToken(payload) {
    const token = jwt.sign({ payload }, "secretkey", { expiresIn: "100d" });
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  },


  GenerateTokenAuth(payload) {
    const token = jwt.sign({ payload }, "secretkey-auth", { expiresIn: "100d" });
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }
};