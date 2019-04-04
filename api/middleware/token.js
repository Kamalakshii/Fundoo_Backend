/******************************************************************************
 *  @Purpose        : Method is used to generate tokens
 *  @file           : token.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 19-03-2019
 ******************************************************************************/
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