const User = require('./userModel.js');
const jwt = require('jwt-simple');
const passwordHash = require('password-hash');

const secret = process.env.JWT_SECRET

module.exports = {
  // signin method
  signin: function(req, res){
    let name = req.body.username;
    let pwd = req.body.password;

    //Looks up the username to get the hashed password
    User.find({username: name}, function(err, user){
      if (err) { //Throws an error if something goes wrong with contacting Mongo
        console.log("mongo find user err: ", err);
      }
      else {
        if(user.length == 1){//If the username is found, verify the given password with the hashed password from Mongo
          if(passwordHash.verify(pwd,user[0].password)){
            console.log("Login success!");
            let token = jwt.encode({username: user.username}, secret);
            //Responds with a jwt token and the mongo_id
            res.status(200).json({token: token, id: user[0].id})
          }
          else{//throw an error if the password is incorrect
            console.log("ERROR: invalid password!");
            res.status(500).send("ERROR: invalid password!");
          }
        }
        else{//throw an error if the 
          console.log("Error: invalid username!")
          res.status(500).send("Error: invalid username!");
        }
      }
    });
  },

  signup: function(req, res){
    let name = req.body.username;
    let pwd = req.body.password;

    //Checks to see if the given username is already in use
    User.find({ username: name }).exec( function(err, user){
      if (err) { //throw an error if something goes wrong when contacting the database
        console.log("mongo find user err: ", err);
        res.status(500).send(err);
      }
      else {
        //user.length will be 0 when the username is not in the databse
        if(user.length == 0){
          let hashedPassword = passwordHash.generate(pwd);
          
          //Creates a new user with the given username and hashed password
          User.create({username: name, password: hashedPassword}, function(err, user){
            if (err) { //throws errow if something goes wrong when contacting the database
              console.log("mongo create user err: ", err);
              res.status(500).send(err);
            } 
            else {
              console.log("mongo create user success!")
              let token = jwt.encode({username: user.username}, secret);
              //Responds with a jwt token and the mongo_id
              res.status(200).json({token: token, id: user.id})
            }
          });
        }
        else{
          //Throws an error if the username is already in use
          console.log("Error: Username is taken!")
          res.status(500).send("Username is taken")
        }
      }
    });
  }
};