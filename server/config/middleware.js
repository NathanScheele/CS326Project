/*
  Add middlewares
*/

// export function
module.exports = function(app, express) {
  // use express.static to serve client folder
  app.use(express.static(__dirname + '/../../public/html'));
};