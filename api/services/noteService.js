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

