/*****************************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : noteController.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 30-03-2019
 *****************************************************************************************/
const noteService = require('../services/noteService');
const labelService = require('../services/noteService');
const redis = require('../services/redisNoteService')
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
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
        var responseResult = {};
        const data = req.decoded.payload.user_id
        //console.log("data is ===",data);
        
        redis.userNotes(data, (err, result) => {
            // If that key exist in Redis store
            if (result) {
                const resultJSON = JSON.parse(result);
                responseResult.status = true;
                responseResult.message = 'List of notes from redis cache';
                responseResult.data = resultJSON;
                res.status(200).send(responseResult);
            }
            // Key does not exist in Redis store 
            // Fetch directly from notesRedis API
            else {
                noteService.getNotes(req, (error,result) => {
                    if (result) {
                        redis.onUpdateUserNotes(result, data);
                        responseResult.status = true;
                        responseResult.message = 'List of notes from database:';
                        responseResult.data = result;
                        res.status(200).send(responseResult);

                    } else {
                        // sending the status code to the response along with our object
                        responseResult.status = false;
                        responseResult.message = 'Failed to generate note';
                        responseResult.error = error;
                        res.status(500).send(responseResult);
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.send(err);
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
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
        console.log("trash controller-->", req.body);

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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);

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
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.editTitle = (req, res) => {
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
            title = req.body.title;
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            noteService.editTitle(noteID, title, (err, result) => {
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.editDescription = (req, res) => {
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
            description = req.body.description;
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            noteService.editDescription(noteID, description, (err, result) => {
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.isPinned = (req, res) => {
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
            pinned = req.body.pinned;
            noteService.isPinned(noteID, pinned, (err, result) => {
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
exports.deleteNote = (req, res) => {
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
            // noteID = req.body.noteID;
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            noteService.deleteNote(req, (err, result) => {
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
exports.notification = (req, res) => {
    try {
        // console.log("in controllerrrrrrrrrrr", req);
        req.checkBody('pushToken', 'pushToken required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            var responseResult = {};
            // const userId = req.decoded.payload.user_id;
            // redis.onDelete(userId);
            noteService.notification(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.sendNotification = (req, res) => {
    try {
        console.log("userId is", req.params.userId);
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            var responseResult = {};
            var user_id = req.params.userId;
            // const userId = req.decoded.payload.user_id;
            // redis.onDelete(userId);
            noteService.sendNotification(user_id, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.status = true;
                    responseResult.data = "Notification sent";
                    res.status(200).send(responseResult);
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}
/**
 * @description:It handles the add labels to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.addLabel = (req, res) => {
    try {
        // req.checkBody('userID', 'userID required').not().isEmpty();
        req.checkBody('label', 'label required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.payload.user_id,
                label: req.body.label
            }
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            labelService.addLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the get labels
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.getLabels = (req, res) => {
    try {
        // req.checkBody('userID', 'userID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.payload.user_id,
            }
            labelService.getLabels(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the delete labels from notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.deleteLabel = (req, res) => {
    try {
        req.checkBody('labelID', 'labelID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                labelID: req.body.labelID,
            }
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            labelService.deleteLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the update the labels
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.updateLabel = (req, res) => {
    try {
        req.checkBody('labelID', 'labelID required').not().isEmpty();
        req.checkBody('editLabel', 'editLabel required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                editLabel: req.body.editLabel,
                labelID: req.body.labelID
            }
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            labelService.updateLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the save labels to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.saveLabelToNote = (req, res) => {
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            noteService.saveLabelToNote(req.body, (err, result) => {
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
 * @description:It handles the delete labels from notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.deleteLabelToNote = (req, res) => {
    try {
        console.log("in controller of delete", req.body);
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
            const userId = req.decoded.payload.user_id;
            redis.onDelete(userId);
            noteService.deleteLabelToNote(req.body, (err, result) => {
                if (err) {
                    console.log("err in controller");
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    console.log("res in controller", responseResult);

                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
