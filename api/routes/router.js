/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : router.js        
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
  router.get('/getNotes', middle.checkToken, noteController.getNotes)
router.put('/updateColor', middle.checkToken, noteController.updateColor);
router.put('/reminder', middle.checkToken, noteController.reminder);
router.put('/isArchived', middle.checkToken, noteController.isArchived);
router.put('/isTrashed', middle.checkToken, noteController.isTrashed);

module.exports = router;