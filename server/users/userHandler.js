const User = require('./userModel.js')

module.exports = {
    // signin method
    signin: function(req, res){
      let userObj = req.body;
      User.find(userObj, function(err, user){
        if (err) { // notifies if error is thrown
          console.log("mongo find user err: ", err);
          helper.sendError(err, req, res);
        }else {
          console.log("login success!")
          var token = jwt.encode(user, 'secret');
          res.json({
            token: token, //session token will be set on client side
            // userid also returned.  This should be assigned to a cookie also so that it is available for future server requests and db queries.
            userid: user['id']
            // anything else to send back on success?
          });
        }
      });
    },

    signup: function(req, res){
      newUserObj = req.body
      User.create(newUserObj, function(err, user){
        if (err) { // notifies if error is thrown
          console.log("mongo create user err: ", err);
          helper.sendError(err, req, res);
        } else { // signup success, assigns jwt session token
          var token = jwt.encode(user, 'secret');
          res.json({
            token: token, //session token will be set on client side
            // userid also returned.  This should be assigned to a cookie also so that it is available for future server requests and db queries.
            userid: user['id']
            // anything else to send back on success?
          });
        }
      });
    }
  };