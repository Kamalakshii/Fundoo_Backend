/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                      to noteModel and save that data to database and at login 
                      time fetching correct information from database.
 *  @file           : noteService.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 01-04-2019
 ******************************************************************************/
const noteModel = require('../model/noteModel');
const notificationModel = require("../model/notificationModel")
const sendPush = require("../../send.js")
/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.createNote = (data, callback) => {
    noteModel.addNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            //  console.log("in service", result);
            callback(null, result);
        }
    });
}
/**
 * @param {*} data 
 * @param {*} callback 
 */
exports.getNotes = (data, callback) => {
    noteModel.getNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            // console.log("In service", result);
            callback(null, result);
        }
    });
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.updateColor = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.updateColor(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.reminder = (paramID, paramData, callback) => {
    console.log("in reminder services", paramID, paramData);
    noteModel.reminder(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.isArchived = (paramID, paramData, callback) => {
    console.log("in archived services", paramID, paramData);
    noteModel.isArchived(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} callback 
 */
exports.isTrashed = (paramID, callback) => {
    // console.log("in services", paramID);
    noteModel.getTrashStatus(paramID, (err, status) => {
        if (err) {
            callback(err);
        } else {
            //console.log("status of that note in services",status);

            if (status === true) {
                let data = {
                    status: false
                }
                noteModel.isTrashed(paramID, data, (err, result) => {

                    if (err) {
                        console.log("service error");
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            } else if (status === false) {
                let data = {
                    status: true
                }
                noteModel.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        console.log("service error");
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            }

        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.editTitle = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.editTitle(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.editDescription = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.editDescription(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @param {*} paramID 
 * @param {*} paramData 
 * @param {*} callback 
 */
exports.isPinned = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.isPinned(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} noteID 
 * @param {*} callback 
 */
exports.deleteNote = (noteID, callback) => {
    noteModel.deleteNote(noteID, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err)
        } else {
            return callback(null, result)
        }
    })
}
exports.notification = (req, callback) => {
    notificationModel.notification(req, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        }
        else {
            return callback(null, result);
        }
    })
}
exports.sendNotification = (user_id, callback) => {
    notificationModel.sendNotification(user_id, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        }
        else {
            console.log("in service", result);
            sendPush.sendNotify(result);
            return callback(null, result);
        }
    })
}
exports.setReminder = () => {

    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 01) + "/" + current_datetime.getFullYear() + ", " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    var as = new Date().toISOString()
    var hold = as.split("T")
    var dat = hold[0].split("-");
    var dateonlyy = dat[2] + "/" + dat[1] + "/" + dat[0]
    console.log("Date is", dateonlyy);


    var d1 = new Date();
    d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + 1);
    d1 = d1.toLocaleString();

    var a = d1.split(",")
    var swapdate1 = a[0].trim();
    var x1 = swapdate1.split("/")

    var timeonly = a[1].trim();
    const [time, modifier] = timeonly.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }   
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    var finalDate1 = dateonlyy + ", " + hours + ":" + minutes + ":00"
    /***************** */
    var as1 = new Date().toISOString()
    var hold1 = as1.split("T")
    var dat1 = hold1[0].split("-");
    var dateonlyy1 = dat1[2] + "/" + dat1[1] + "/" + dat1[0]

    d2 = d2.toLocaleString();
    var a1 = d2.split(",")
    var swapdate = a1[0].trim();
    var x = swapdate.split("/")
    var timeonly1 = a1[1].trim();
    const [time1, modifier1] = timeonly1.split(' ');
    let [hours1, minutes1] = time1.split(':');
    if (hours1 === '12') {
        hours1 = '00';
    }
    if (modifier1 === 'PM') {
        hours1 = parseInt(hours1, 10) + 12;
    }
    var finalDate2 = dateonlyy1 + ", " + hours1 + ":" + minutes1 + ":00"
    console.log("DATE1=", finalDate1);
    console.log("DATE2=", finalDate2);
    
   

    noteModel.reminderMessage(finalDate1, finalDate2, (err, result) => {
        if (err) {
            console.log("service error");
            //  callback(err);
        }
        else {
            if (Array.isArray(result)) {
                var temp = result[0][0].split(",");
                var userId = temp[0];
                var title = temp[1];
                var body = temp[2];
                notificationModel.sendNotification(userId, (err, result) => {
                    if (err) {
                        console.log("service error");
                    }
                    else {
                        sendPush.sendNotify(result, title, body);
                    }
                })
            }
            else {
                console.log("SERVICE result= ", result);
            }
        }
    })
}
exports.updateSequenceNum = (paramData,callback)=>{
    noteModel.updateSequenceNum(paramData,(err,result)=>{
        if(err)
        {
            callback(err);
        }else{
         const DATA = {
             sequenceNum : 1,
             noteID : ""
         }
        }
    })
}
/**
 * @description:it will send add label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.addLabel = (labelData, callback) => {
   // console.log("label data in services.....",labelData);
    noteModel.addLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send get label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.getLabels = (labelData, callback) => {
    noteModel.getLabels(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send delete label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.deleteLabel = (labelData, callback) => {
    noteModel.deleteLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send update label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.updateLabel = (labelData, callback) => {
    noteModel.updateLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send save label data to model
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.saveLabelToNote = (paramData, callback) => {
    console.log("in save label.........",paramData);  
    if (paramData.pull) {
        noteModel.deleteLabelToNote(paramData, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
    else {
        noteModel.saveLabelToNote(paramData, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
}
/**
 * @description:it will send delete label data to model
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.deleteLabelToNote = (paramData, callback) => {
    console.log("in services of delete",paramData);    
    noteModel.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("res in service",result);          
            return callback(null, result)
        }
    })
}


