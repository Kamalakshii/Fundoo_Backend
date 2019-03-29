/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : routes.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 08-03-2019
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const middle = require('../authentication/authentication')
const userController = require('../controller/userController')
const noteController = require("../controller/noteController")
router.post('/login',userController.login);
router.post('/registration',userController.registration);
router.post('/forgotPassword', userController.forgotPassword);
// router.post('/resetPassword/:token', middle.checkTokenResetPassword, userController.setPassword);
// router.post('/createNote', middle.checkTokenLogin, noteController.createNote);
  // router.post('/createNote',function(req, res){
  //     noteController.createNote
  //   });
  router.post(
    "/resetPassword/:token",
    middle.resetToken,
    userController.setPassword
  );
  router.post('/createNote', middle.checkToken, noteController.createNote);
module.exports = router;