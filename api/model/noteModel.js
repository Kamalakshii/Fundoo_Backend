/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : noteModel.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 30-03-2019
 ******************************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: 'Note'
    },
    title: {
        type: String,
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    color: {
        type: String,
        required: [true, "Color required"]
    },
    reminder: {
        type: String
    },
    archive: {
        type: Boolean
    },
}, {
    timestamps: true
});
function noteModel() {}
var note = mongoose.model('Note', noteSchema);
noteModel.prototype.addNotes = (objectNote, callback) => {
   // console.log("data====>", objectNote);
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
        userId: id.decoded.payload.user_id
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
/**
 * @description:
 * @param {*} noteID 
 * @param {*} updateParams 
 * @param {*} callback 
 */
noteModel.prototype.updateColor = (noteID, updateParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                color: updateParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, updateParams);
            }
        });
};
/**
 * 
 * @param {*} noteID 
 * @param {*} reminderParams 
 * @param {*} callback 
 */
noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                reminder: reminderParams
            }
        },
        (err, result) => {    
            if (err) {
                callback(err)
            } else {
                return callback(null, reminderParams)
            }
        });
};
/**
 * 
 * @param {*} noteID 
 * @param {*} archiveParams 
 * @param {*} callback 
 */
noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                archive: archiveNote,
                trash: false,
                pinned: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, archiveNote)
            }
        });
};

module.exports = new noteModel();
