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
    trash: {
        type: Boolean
    }
}, {
        timestamps: true
    });
function noteModel() { }
var note = mongoose.model('Note', noteSchema);
noteModel.prototype.addNotes = (objectNote, callback) => {
    console.log("data====>", objectNote.body);
    const noteModel = new note(objectNote.body);
    //   const noteModel = new note({
    //     "userId": req.body.userId,
    //     "title": req.body.title,
    //     "description": req.body.description,
    //     "reminder": req.body.reminder,
    //     "color": req.body.color,
    //     "archive": req.body.archive,
    //     "trash": req.body.trash
    // });
    noteModel.save((err, result) => {
        if (err) {
            callback(err);
        } else {
           // console.log("result create note",result);
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
/**
 * 
 * @param {*} noteID 
 * @param {*} trashParams 
 * @param {*} callback 
 */
noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {

    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                trash: trashNote.status,
                pinned: false,
                archive: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, trashNote)
            }
        });
}

noteModel.prototype.getTrashStatus = (id, callback) => {
      console.log("getTrashStatus",id);

    note.findOne({ _id: id }, (err, result) => {
        //console.log("id", id);
        if (err) {
            callback(err)
        } else {
            console.log("status", result)
            return callback(null, result.trash)
        }
    })
}






module.exports = new noteModel();
