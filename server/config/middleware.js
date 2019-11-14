/*
  Add middleware
*/
const bodyParser = require('body-parser');

// export function
module.exports = function(app, express) {
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  // use express.static to serve client folder
  app.use(express.static(__dirname + '/../../public/html'));
};