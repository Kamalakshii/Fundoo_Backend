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
            // console.log("In service", result);
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


