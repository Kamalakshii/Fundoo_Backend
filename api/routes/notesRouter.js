/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : router.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 08-03-2019
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const middle = require('../authentication/authentication')
const noteController = require("../controller/noteController")
const upload = require('../middleware/fileUpload');
  router.post('/createNote', middle.checkToken, noteController.createNote);
  router.get('/getNotes', middle.checkToken, noteController.getNotes)
router.put('/updateColor', middle.checkToken, noteController.updateColor);
router.put('/reminder', middle.checkToken, noteController.reminder);
router.put('/isArchived', middle.checkToken, noteController.isArchived);
router.put('/isTrash',middle.checkToken,noteController.isTrashed);
router.put('/editTitle', middle.checkToken, noteController.editTitle);
router.put('/editDescription', middle.checkToken, noteController.editDescription);
router.put('/isPinned', middle.checkToken, noteController.isPinned);
router.post('/deleteNote', middle.checkToken, noteController.deleteNote);
module.exports = router;