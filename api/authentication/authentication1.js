/******************************************************************************
 *  @Purpose        : Create authentication to change the settings or password. 
 *  @file           : authentication.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 08-03-2019
 ******************************************************************************/
var jwt = require('jsonwebtoken');
exports.checkTokenResetPassword = (req, res, next) => {
    console.log("reset ===>", req.body);
    var token1 = req.headers['token'];
    if (token1) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(token1, 'secretkey', (err, decoded) => {
            if (err) {
                return res.send({
                    status: false,
                    message: 'Token is not valid..! fggffcgf'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }

    exports.checkTokenLogin= (req, res, next) => {
         console.log("for login===>", req.body);
         // console.log("reuest===>", req.headers);
         var token1 = req.headers['token'];
         /**
          * 
          **/
         if (token1) {
             /**
              * @description:verifies secret and checks expression
              **/
             jwt.verify(token1, 'secretkey-auth', (err, decoded) => {
                 if (err) {
                     return res.status(401).send({
                         status: false,
                         message: 'Unauthorised access, please provide valid token!'
                     });
                 } else {
                     req.decoded = decoded;
                     next();
                 }
             });
         } else {
             /**
              * @description:if there is no token return an error
              **/
             return res.send({
                 status: false,
                 message: 'No token provided!!'
             });
         }
}
}