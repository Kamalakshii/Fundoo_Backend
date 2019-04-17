/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to user_model and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : userService.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 09-03-2019
 ******************************************************************************/
const userModel = require('../model/userModel')
/**
 * @param {*} data 
 * @param {*} callback 
 */
exports.login = (data, callback) => {
    try {
        userModel.login(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            }
            else {
             //   console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * @param {*} data 
 * @param {*} callback 
 */
exports.registration = (data, callback) => {
    try {
        userModel.registration(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            }
            else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
exports.forgotPassword = (data, callback) => {
    try {
        userModel.forgotPassword(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * @description:it will send resetPassword data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback 
 */
exports.resetpassword = (data, callback) => {
    try {
        userModel.updateUserPassword(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
  exports.setProfilePic = (paramID, image, callback) => {
    // console.log("in services");
    try {
        userModel.setProfilePic(paramID, image, (err, result) => {
            if (err) {
                console.log("service error in setProfile pic");
                callback(err);
            } else {
                 callback(null, result)
            }
        })
    } catch (error) {
        callback.send(error);
    }
  }
