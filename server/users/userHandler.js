const User = require('./userModel.js');
const jwt = require('jwt-simple');
const passwordHash = require('password-hash');

const secret = process.env.JWT_SECRET

module.exports = {

  //req should be in the form of {name: <user's name>, password: <user's password>}
  signin: function(req, res){
    let name = req.query.username;
    let pwd = req.query.password;

    //Looks up the username to get the hashed password
    User.find({username: name}, function(err, user){
      if (err) { //Throws an error if something goes wrong with contacting Mongo
        console.log("mongo find user err: ", err);
      }
      else {
        console.log(user.length)
        if(user.length == 1){//If the username is found, verify the given password with the hashed password from Mongo
          if(passwordHash.verify(pwd,user[0].password)){
            console.log("Login success!");
            let token = jwt.encode({id: user[0].id}, secret);
            //Responds with a jwt token and the mongo_id
            res.status(200).json({token: token})
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

  //req should be in the form of {name: <user's name>, password: <user's password>}
  signup: function(req, res){
    let name = req.query.username;
    let pwd = req.query.password;

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
              let token = jwt.encode({id: user.id}, secret);
              //Responds with a jwt token and the mongo_id
              res.status(200).json({token: token})
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
  },

  //req should be in the form of {token: <jwt token form local storage>, location: <"fridge" or "freezer">, item: <name: <name of food>>}
  addItem: function(req, res){
    let token = req.query.token;
    let loc = req.query.location;
    let item = req.query.item;

    let decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function(err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      } 
      else {
        if(loc == "fridge"){
          user.fridge.push(item)
        }
        else{
          user.freezer.push(item);
        }

        user.save(function (err, user) {
          if(err){
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else{
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
   });
  },

  //req should be in the form of {token: <jwt token form local storage>, location: <"fridge" or "freezer">, item: <food item to removed>}
  removeItem: function(req, res){
    let token = req.query.token;
    let loc = req.query.location;
    let item = req.query.item;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function(err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      } 
      else {
        if(loc == "fridge"){
          user.fridge.splice(user.fridge.indexOf(item), 1);
        }
        else{
          user.freezer.splice(user.fridge.indexOf(item), 1);
        }

        user.save(function (err, user) {
          if(err){
            console.log("ERROR: unable to update")
            res.status(500).send("Error: unable to update")
          }
          else{
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
   });
  },

  getItems: function(req, res){
    let token = req.query.token;
    let loc = req.query.location;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function(err, user){
      if(err){
        console.log("Error: unable to contact database");
        res.status(500).send("Error: unable to contact database");
      }
      else{
        if(loc == 'fridge'){
          res.status(200).json(user.fridge);
        }
        else if(loc == 'freezer'){
          res.status(200).json(user.freezer);
        }
        else{
          res.status(200).json({freezer: user.freezer, fridge: user.fridge});
        }
      }
    });
  }
};