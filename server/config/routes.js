// require userHandler, listHandler
let userHandler = require('../users/userHandler.js');

// export function
module.exports = function(app, express){
  app.post('/api/signup', userHandler.signup);
  app.get('/api/signin', userHandler.signin);
  app.put('/api/addItem', userHandler.addItem);
  app.put('/api/removeItem', userHandler.removeItem);
};