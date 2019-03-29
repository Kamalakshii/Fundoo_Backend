/******************************************************************************
 *  @Purpose        : To create user controller to handle the incoming data. 
 *  @file           : userController.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @version        : v0.1
 *  @since          : 16-03-2019
 ******************************************************************************/
const userService = require("../services/userService");
const sent = require('../middleware/nodemailer');
const token = require('../middleware/token');

require("dotenv").config();

// var env = process.env.NODE_ENV || "local";
/**
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
   try {
    req.checkBody('email', 'Invaild email').isEmail();
     req.checkBody('password', 'Invaild password').isLength({
        min: 8
    });
     var errors = req.validationErrors();
     var response = {};
     if (errors) {
         response.status = false;
         response.error = errors;
         return res.status(422).send(response);
     } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = 'Login Failed';
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          //  console.log("result in control==>",result);
            
          responseResult.status = true;
          responseResult.message = 'Login Successful';          
         responseResult.result = result;
        // res.status(200).send(responseResult);
          const payload = {
            user_id: result._id,
            username: result.firstname,
            email: result.email,
            success: true
        }
        const obj = token.GenerateTokenAuth(payload);
      //  console.log("payload is ,",payload);
        
       // console.log("check  obj",obj);
        
        responseResult.token = obj;
        console.log("===============> is ,",responseResult);
        //const redisKey = result.email;
       // console.log("rediskey", redisKey);
        //client.setex(redisKey, 36000, JSON.stringify(responseResult.token.token));
        res.status(200).send(responseResult);
        // const obj = token.GenerateTokenResetPassword(payload);
        // const url = `http://localhost:3000/login/${obj.token}`;  //process.env.CLIENT_FORGOTPASS_URL
        // sent.sendEMailFunction(url);
        // res.status(200).send(url);
        }
      });
    }
  } catch (err) {
     res.send(err);
   }
}


/**
 * @param {*} req 
 * @param {*} res 
 */
exports.registration = (req, res) => {
    try {
        console.log("regggg...",req.body);
        
         req.checkBody('firstname', 'Invaild firstname').isLength({
             min: 3
         }).isAlpha();
         req.checkBody('lastname', 'Invaild lastname').isLength({
             min: 3
         }).isAlpha();
         req.checkBody('email', 'Invaild email').isEmail();
         req.checkBody('password', 'Invaild password').isLength({
             min: 8
         });
         var errors = req.validationErrors();
         var response = {};
         if (errors) {
             response.status = false;
             response.error = errors;
         return res.status(422).send(response);
         } else {
            var responseResult = {}
            userService.registration(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Registration Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Registration Successful';
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
         res.send(err);
     }
};
exports.forgotPassword = (req, res) => {
    console.log("request in controller ==>",req.body);    
    try {
        req.checkBody('email', 'Invaild email').isEmail();
        var responseResult = {};
      //  userService.getUserEmail(req.body, (err, result) => {
             userService.forgotPassword(req.body, (err, result) => {
            if (err){
                responseResult.success = false;
                responseResult.error = err;
            res.status(500).send(responseResult)
            }
            else {
                console.log("success");
                
                responseResult.success = true;
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
               // console.log(payload);
                const obj = token.GenerateToken(payload);
                const url = `http://localhost:3000/resetPassword/${obj.token}`;  //process.env.CLIENT_FORGOTPASS_URL
                sent.sendEMailFunction(url);
                res.status(200).send(url);
            }
        })
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:It handles the resetPassword Page
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.setPassword = (req, res) => {
    try {
        req.checkBody('password', 'Invaild Password').isLength({
            min: 8
        });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            res.status(422).send(response);
        } else {
            var responseResult = {};
            userService.resetpassword(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Password Reset failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Password Reset Successfully';
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    //console.log("pyload is ",payload);
                    // const obj = token.GenerateTokenAuth(payload);
                    // responseResult.token = obj;
                    res.status(200).send(responseResult);

                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
