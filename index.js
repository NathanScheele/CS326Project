const app = require('./server/server.js');
const mongoose = require('mongoose');
const browserSync = require('browser-sync');

let port = 3000;

// set mongoURI
var mongoURI = process.env.MONGODB_URI
// connect db
mongoose.connect(mongoURI);

app.listen(port);
console.log("Server is listening on port " + port);