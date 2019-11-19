const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fridge: [{name: String, expDate: Date, dateBought: Date, quantity: Number}],
    freezer: [{name: String, expDate: Date, dateBought: Date, quantity: Number}]
});

// Export this schema to make it available from other files
module.exports = mongoose.model('User', UserSchema)
