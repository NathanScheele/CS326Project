const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fridge: [{name: String, expDate: Date, purchaseDate: Date, quantity: Number}],
    freezer: [{name: String, expDate: Date, purchaseDate: Date, quantity: Number}]
});

// Export this schema to make it available from other files
module.exports = mongoose.model('User', UserSchema)
