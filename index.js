const app = require('./server/server.js');
const mongoose = require('mongoose');
const browserSync = require('browser-sync');

let app = express();
let port = 3000;

// set mongoURI
var mongoURI = process.env.MONGODB_URI
// connect db
mongoose.connect(mongoURI);

app.listen(port, listening);

function listening () {
  browserSync({
    proxy: 'localhost:' + port,
    files: ['public/**/*.{js,html,css}']
  });
}
console.log("Server is listening on port " + port);