const express = require('express');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes.js');

// start express
const app = express();

// set middleware
middleware(app, express);

// set routes
routes(app, express);

// export app
module.exports = app;
