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
const upload = require('../middleware/fileUpload');
router.post('/login',userController.login);
router.post('/registration',userController.registration);
router.post('/forgotPassword', userController.forgotPassword);
  router.post(
    "/resetPassword/:token",
    middle.resetToken,
    userController.setPassword
  );
router.put('/setProfilePic', middle.checkToken, upload.single('image'), userController.setProfilePic);
module.exports = router;