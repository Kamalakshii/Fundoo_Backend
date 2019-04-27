/******************************************************************************
 *  @Purpose        : To create a notification schema and store data into database.
 *  @file           : noteModel.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 25-04-2019
 ******************************************************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * creating notification schema using mongoose
 */
var notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: "notification"
    },
    pushToken: {
        type: String,
        require: [true, "pushToken required"]
    }
},
    {
        timestamps: true
    }
);
function notificationModel() { }
var notification = mongoose.model("notification", notificationSchema);
notificationModel.prototype.notification = (req, callback) => {
    notification.findOneAndUpdate({
        userId: req.body.userId
    }, {
            $set: {
                pushToken: req.body.pushToken
            }
        },
        { upsert: true, new: true },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, result)
            }
        })
}
notificationModel.prototype.sendNotification = (user_id, callback) => {  
    notification.findOne({
        userId: user_id
    },
        (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            }
            else {
                console.log("RESULT+++++++++++", result);
                return callback(null, result.pushToken)
            }
        })
}
module.exports = new notificationModel();