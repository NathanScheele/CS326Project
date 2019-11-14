// require userHandler, listHandler
var userHandler = require('../users/userHandler.js');

// export function
module.exports = function(app, express){
  app.post('/api/signup', userHandler.signup);
  app.get('/api/signin', userHandler.signin);
};