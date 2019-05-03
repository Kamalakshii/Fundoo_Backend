/******************************************************************************
 *  @Purpose        : To create a server to connect with front end and get the 
                      request and send response to client
 *  @file           : server.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 04-03-2019
 ******************************************************************************/

 const express = require('express');
const bodyParser = require('body-parser');
const noteService = require('../Server/api/services/noteService')
/**
 *  To give path to each file
 */
const router = require("./api/routes/userRouter")
const router1 = require("./api/routes/notesRouter")
/** 
 * to create express app
*/
 const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/** 
 * To perform validations
*/
 var expressValidator = require('express-validator');
app.use(expressValidator());
/**
 * To get the path of database
 **/
const databaseConfig = require("./configuration/dbConfiguration");
/**
 *  Configuring the database
 **/
const mongoose = require("mongoose");
mongoose.Promise=global.Promise;
require('dotenv').config();
/**
 * Connecting to the database
 **/
mongoose
.connect(databaseConfig.url,{useNewUrlParser:true})
.then(()=>{
        /**
     * Promise is fullfilled
     **/
console.log("Successfully connected to the database");
})
.catch(err => {
     /**
     * Promise is rejected
     **/
    console.log("Connection to the database failed ! Exiting now...",err);
    process.exit();
});
mongoose.set('useCreateIndex', true);
require("http").createServer(app);
    app.use("/",router);
    app.use("/",router1);
/** 
 *  define a simple router
*/ 
app.get('/', (req, res) => {
    res.json("Welcome to Fundoo");
});
// to listen for requests
const server = app.listen(4000, () => {
    console.log("The server is listening on port number 4000");
});
// module.exports = app;


 var schedule = require('node-schedule');

// var j = schedule.scheduleJob({ rule: '*/1 * * * * *' }, function(){
//   console.log('Time for tea!');
// });

var j = schedule.scheduleJob({ rule: '*/10 * * * * ' }, function(){
noteService.setReminder();
});
















