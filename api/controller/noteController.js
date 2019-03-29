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
                    responseResult.status = false;
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
        // console.log("note Controller", req);
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