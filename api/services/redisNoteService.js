/******************************************************************************
 *  @Purpose        : To create a redis cache
 *  @file           : userModel.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 10-05-2019
 ******************************************************************************/
const redis = require('redis');
 //creates a new client
const client = redis.createClient();
const query = 'notes-'
//to listen for error
client.on('error', (err) => {
    console.error(err);
});
module.exports = {
    userNotes(data, callback) {
        client.get(query + data, (err, result) => {
            if (result) {
                console.log("RESULT_________________",result);               
                callback(null, result);
            } else {
                console.error("REDIS ERROR: ", err);
                callback(err);
            }
        })
    },
    onUpdateUserNotes(result, key) {
        try {
            // Save the notesRedis API response in Redis store
            client.set(query + key, JSON.stringify(result));
        } catch (err) {
            throw new Error("Redis SET error", err);
        }
    },
    onDelete(userId) {
        client.del(query +userId, function (err, response) {
            if (response == 1) {
                console.log("deleted successfully");
            } else {
                console.log("cannot delete");
            }
        })
    }
}