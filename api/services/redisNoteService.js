const redis = require('redis');
const client = redis.createClient();
const query = 'notes-'

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