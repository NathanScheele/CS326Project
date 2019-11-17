const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fridge: [{name: String, expDate: Date}],
    freezer: [{name: String, expDate: Date}]
});

// Export this schema to make it available from other files
module.exports = mongoose.model('User', UserSchema)
