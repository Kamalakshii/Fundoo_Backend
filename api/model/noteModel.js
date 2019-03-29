const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
   
}, {
    timestamps: true
});
function noteModel() {}
var note = mongoose.model('Note', noteSchema);
noteModel.prototype.addNotes = (objectNote, callback) => {
    console.log("data====>", objectNote);
    const noteModel = new note(objectNote.body);
    noteModel.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
/**
 * @description:it will get the notes using email and find the notes with data
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getNotes = (id, callback) => {
    note.find({
        email: id.decoded.payload.email
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
module.exports = new noteModel();
