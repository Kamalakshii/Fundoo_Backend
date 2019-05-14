var admin = require("firebase-admin");
var serviceAccount = require("../Server/fir-storage-sdk");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fundoo-f7774.firebaseio.com"
});
module.exports = {
  sendNotify(token, title, body) {
    var registrationToken = token;
    var payload = {
      notification: {
        title: title,
        body: body
      }
    };
    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
    admin.messaging().sendToDevice(registrationToken, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
  }
};