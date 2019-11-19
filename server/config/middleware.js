const bodyParser = require('body-parser')

/*
  Add middleware
*/

// export function
module.exports = function(app, express) {
  // use express.static to serve client folder
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public'));
};