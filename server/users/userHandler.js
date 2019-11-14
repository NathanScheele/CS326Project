const User = require('./userModel.js')

module.exports = {
    // signin method
    signin: function(req, res){
      let userObj = req.body;
      User.find(userObj, function(err, user){
        if (err) { // notifies if error is thrown
          console.log("mongo find user err: ", err);
        }
        else {
          console.log("login success!")
        }
      });
    },

    signup: function(req, res){
      let newUserObj = req.body
      User.create(newUserObj, function(err, user){
        if (err) { // sign up error
            console.log("mongo create user err: ", err);
            res.status(500).send(err);
        } 
        else { // signup success
            console.log("mongo create user success!")
            res.status(200).send(newUserObj)
        }
      });
    }
  };