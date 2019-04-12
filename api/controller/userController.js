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
// const responseTime = require('response-time');
// const express = require('express');
// const redis = require('redis');
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
        }
        //  else {
        //     const app = express();
        //     // create and connect redis client to local instance.
        //     const client = redis.createClient();
        //     // Print redis errors to the console
        //     client.on('error', (err) => {
        //         console.log("Error " + err);
        //     });
        //     app.use(responseTime());
        //     // Extract the query from url and trim trailing spaces
        //     // const query = (req.body.email+req.body._id).trim();
        //     // Build the Wikipedia API url
        //     const redisKey = req.body.email;
        //     // Try fetching the result from Redis first in case we have it cached
        //     return client.get(redisKey, (err, result) => {
        //         // If that key exist in Redis store
        //         // console.log("result==>", result);
        //         if (result) {
        //             console.log('inside if ===>' + result);
        //             const resultJSON = JSON.parse(result);
        //             return res.status(200).send(resultJSON);
        //         }
        else {
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
                    console.log("===============> is ,", responseResult);
                    //     const redisKey = result.email;
                    //    console.log("rediskey", redisKey);
                    //     client.setex(redisKey, 36000, JSON.stringify(responseResult.token.token));
                    res.status(200).send(responseResult);
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
        console.log("regggg...", req.body);

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
   // console.log("request in controller ==>", req.body);
    try {
        req.checkBody('email', 'Invaild email').isEmail();
        var responseResult = {};
        //  userService.getUserEmail(req.body, (err, result) => {
        userService.forgotPassword(req.body, (err, result) => {
            if (err) {
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
                    res.status(200).send(responseResult);

                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
exports.setProfilePic = (req, res) => {
    try {
         //console.log("req-------------------->",req.decoded);
        // console.log("req-------------------->",req.file.location)
        var responseResult = {};
        userId = req.decoded.payload.user_id;
        let image = (req.file.location)
        userService.setProfilePic(userId, image, (err, result) => {
            // console.log("image=>", result);
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            } else {
                responseResult.status = true;
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.send(error);
    }
}