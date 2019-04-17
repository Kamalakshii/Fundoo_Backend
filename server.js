/******************************************************************************
 *  @Purpose        : To create a server to connect with front end and get the 
                     request and send response to client
 *  @file           : server.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 04-03-2019
 ******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
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
require("http").createServer(app);
    app.use("/",router);
    app.use("/",router1);
/** 
 *  define a simple route
*/ 
app.get('/', (req, res) => {
    res.json("Welcome to Fundoo");
});
// to listen for requests
const server = app.listen(4000, () => {
    console.log("The server is listening on port number 4000");
});
module.exports = app;
/**
 * socket connection
 */
// const io = require('socket.io').listen(server)
// io.sockets.on('connection', function (socket) {
//     //Whenever someone connects this gets executed
//     console.log("user is connected")
//     socket.on('new_msg', function (req) {
//         console.log("request in server js ==>",req);
//         chatControllers.addMessage(req, (err, result) => {
//             if (err) {
//                 console.log("Error on server side while receiving the data");
//             }
//             else {
              
//             }
//             io.emit(req.recieverId, result);
//             io.emit(req.senderId,result);
//         })
//     })
// })
module.exports = app;
