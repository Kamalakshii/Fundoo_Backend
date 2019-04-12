/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                    to noteModel and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : noteService.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 01-04-2019
 ******************************************************************************/
const noteModel = require('../model/noteModel');
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
        console.log("In service", result);
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
    console.log("in services", paramID);
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
