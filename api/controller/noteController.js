/*****************************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : noteController.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 30-03-2019
 *****************************************************************************************/
const noteService = require('../services/noteService');
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.createNote = (req, res) => {
    try {
        req.checkBody('title', 'Title should not be empty').not().isEmpty();
        req.checkBody('description', 'Description should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteService.createNote(req, (err, result) => {
                if (err) {
                    responseResult.status = false
                    responseResult.message = 'Failed to create note';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    var userNote = {
                        note: result,
                    }
                    responseResult.status = true;
                    responseResult.message = result;
                    responseResult.data = userNote;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
exports.getNotes = (req, res) => {
    try {
    console.log("note Controller", req.body);
        var responseResult = {};
        noteService.getNotes(req, (err, result) => {
            if (err) {

                responseResult.status = false;
                responseResult.message = 'Failed to generate note';
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.message = 'List of notes:';
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.send(err)
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateColor = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('color', 'color should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            color = req.body.color;
            noteService.updateColor(noteID, color, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.reminder = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            reminder = req.body.reminder;
            noteService.reminder(noteID, reminder, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.isArchived = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('archive', 'archive required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            archive = req.body.archive;
            noteService.isArchived(noteID, archive, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.isTrashed = (req, res) => {
    try {
        console.log("trash controller-->",req.body);
        
        req.checkBody('noteID', 'noteID required').not().isEmpty();
      //  req.checkBody('trash', 'trash required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
        
            
            noteService.isTrashed(noteID, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
// exports.deleteNote = (req, res) => {
//     try {
//         req.checkBody('noteID', 'noteID required').not().isEmpty();
//         var errors = req.validationErrors();
//         var response = {};
//         if (errors) {
//             response.status = false;
//             response.error = errors;
//             return res.status(422).send(response);
//         } else {
//             var responseResult = {};
//             // noteID = req.body.noteID;
//             noteService.deleteNote(req, (err, result) => {
//                 if (err) {
//                     responseResult.status = false;
//                     responseResult.error = err;
//                     res.status(500).send(responseResult);;
//                 } else {
//                     responseResult.status = true;
//                     responseResult.data = result;   
//                     res.status(200).send(responseResult);
//                 }
//             })
//         }
//     } catch (error) {

//         res.send(error)
//     }
// }