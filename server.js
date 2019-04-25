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



// var admin = require("firebase-admin");
// var serviceAccount = require("../Server/fir-storage-sdk");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://fundoo-f7774.firebaseio.com"
// });
// var registrationToken = "dsliHhrsg2E:APA91bEDy3ef6j87iT2gWdbLH3Ml_49iAXKE80fJpm5npmk26U3YBWqXMCz9f6_Q-fXHLP-EPsQrcuukVV7sRtMNubamGJmamQwsxpJuOqGgyM9HZ_1rx2tApq56HwrJRKfNceJcYZ8e";
// var payload = {
//     data: {
//       title: "Hello",
//        body: "how r u"
//     }
//   };
//   var options = {
//     priority: "normal",
//     timeToLive: 60 * 60
//   };
//   admin.messaging().sendToDevice(registrationToken, payload, options)
//   .then(function(response) {
//     console.log("Successfully sent message:", response);
//   })
//   .catch(function(error) {
//     console.log("Error sending message:", error);
//   });
 var schedule = require('node-schedule');
// let startTime = new Date(Date.now() + 5000);
// let endTime = new Date(startTime.getTime() + 5001);
// var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
//   console.log('Time for tea!');
// });
let d1 = new Date();
let d2 = new Date();
var j = schedule.scheduleJob({rule:"*/1* * * * *"},function(){
    console.log("original date",d1);
    console.log("new date",d2);
})




