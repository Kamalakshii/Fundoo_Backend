/******************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : userModel.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 9-03-2019
 ******************************************************************************/
const mongoose = require('mongoose');
/**
 * Require Bcrypt to create hash of the user password that is stored in database
 **/
const bcrypt = require('bcrypt');
var saltRounds = 10;
/**
 * Creating user schema using mongoose
 **/
const UserSchema = mongoose.Schema({
    firstname: {
        type: String, require: [true, "FirstName require"]
    },
    lastname: {
        type: String, require: [true, "LastName require"]
    },
    email: {
        type: String, require: [true, "Email require"]
    },
    password: {
        type: String, require: [true, "Password require"]
    },
    profilePic: {
        type: String,
    }
},
    {
        timestamps: true
    });
var user = mongoose.model('User', UserSchema);
function userModel() { }
function hash(password) {
    var pass = bcrypt.hashSync(password, saltRounds);
    return pass;
}
/**
 * Saving data into database using the user schema
 **/
userModel.prototype.registration = (body, callback) => {
    /**
     * Find the user by Email in database if user with same Email exists
     **/

    //console.log("before =>",body);
    
    user.find({ "email": body.email },(err, data) => {
       // console.log("data==>",data);
        if (err) {
            console.log("Error in registration");
            callback(err);
        }
        else {
            if (data.length> 0) {
                console.log("The Email already exists...");
                callback("The User already present...");
            }
            else {
                /**
                 * Create hash value of user password
                 **/
                body.password1 = bcrypt.hashSync(body.password, saltRounds);
                var newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": body.password1,
                })
                newUser.save((err, result) => {
                    if (err) {
                        console.log("Model not found");
                        callback(err);
                    } else {
                        console.log("Registered Successfully");
                        callback(null,result);
                    }
                })
            }
        }
    });
}
/**
 * Finding user into database using the findOne()
 **/
userModel.prototype.login = (body, callback) => {
  //  console.log("model ", body);
    user.findOne({ "email": body.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else if (result != null) {
            bcrypt.compare(body.password, result.password).then(function (res) {
                if (res) {
                    console.log("Login Succesfully");
                    callback(null, result);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        } else {
            console.log("invalid user");
            callback("invalid user");
        }
    });
}
userModel.prototype.forgotPassword = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("Incorect mail")
            }
        }
    });
}
/**
 * @description:update the user password and store it in database
 * @param {*request from frontend} body 
 * @param {*response to backend} callback 
 */
userModel.prototype.updateUserPassword = (req, callback) => {
    console.log("request===>", req.decoded);
    var newpassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log('new pass bcrypt==>', newpassword);
    user.updateOne({
        _id: req.decoded.payload.user_id
    }, {
        password: newpassword
    }, (err, result) => {
        console.log("result ==>", result.newpassword)
        if (err) {
            callback(err);
        } else {
            console.log("result ==>", result);
            callback(null, result);
        }
    });
    userModel.prototype.findUserEmail = (data, callback) => {
        user.findOne({
            "email": data.email
        }, (err, result) => {
            if (err) {
                callback(err);
            } else {
                if (result !== null && data.email == result.email) {
                    callback(null, result);
                } else {
                    callback("Incorrect mail")
                }
            }
        });
    }
}
userModel.prototype.getAllUser = callback => {
    user.find({}, (err, result) => {
      if (err) {
        callback(err);
      } else {
        console.log("In model====", result);
        callback(null, result);
      }
    })
}
userModel.prototype.setProfilePic = (userID, image, callback) => {
    // console.log("ID=====================",userID);
    // console.log("image=====================",image);
    user.findOneAndUpdate({
            _id: userID
        }, {
            $set: {
                profilePic: image
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("updated image successfully")
                return callback(null, image)
            }
        });
};

module.exports = new userModel();
