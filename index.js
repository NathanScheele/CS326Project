const express = require('express');
const browserSync = require('browser-sync');
const path = require('path');

let app = express();
let port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
}).listen(port, listening);

function listening () {
  browserSync({
    proxy: 'localhost:' + port,
    files: ['public/**/*.{js,html}']
  });
}