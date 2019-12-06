const User = require('./userModel.js');
const jwt = require('jwt-simple');
const passwordHash = require('password-hash');
const https = require('https');

const secret = process.env.JWT_SECRET;

module.exports = {

  //req should be in the form of {username: <user's name>, password: <user's password>}
  signin: function (req, res) {
    let name = req.query.username;
    let pwd = req.query.password;

    //Looks up the username to get the hashed password
    User.find({ username: name }, function (err, user) {
      if (err) { //Throws an error if something goes wrong with contacting Mongo
        console.log("mongo find user err: ", err);
      }
      else {
        console.log(user.length)
        if (user.length == 1) {//If the username is found, verify the given password with the hashed password from Mongo
          if (passwordHash.verify(pwd, user[0].password)) {
            console.log("Login success!");
            let token = jwt.encode({ id: user[0].id }, secret);
            //Responds with a jwt token and the mongo_id
            res.status(200).json({ token: token })
          }
          else {//throw an error if the password is incorrect
            console.log("ERROR: invalid password!");
            res.status(500).send("ERROR: invalid password!");
          }
        }
        else {//throw an error if the 
          console.log("Error: invalid username!")
          res.status(500).send("Error: invalid username!");
        }
      }
    });
  },

  //req should be in the form of {name: <user's name>, password: <user's password>}
  signup: function (req, res) {
    let name = req.body.username;
    let pwd = req.body.password;

    //Checks to see if the given username is already in use
    User.find({ username: name }).exec(function (err, user) {
      if (err) { //throw an error if something goes wrong when contacting the database
        console.log("mongo find user err: ", err);
        res.status(500).send(err);
      }
      else {
        //user.length will be 0 when the username is not in the databse
        if (user.length == 0) {
          let hashedPassword = passwordHash.generate(pwd);

          //Creates a new user with the given username and hashed password
          User.create({ username: name, password: hashedPassword }, function (err, user) {
            if (err) { //throws errow if something goes wrong when contacting the database
              console.log("mongo create user err: ", err);
              res.status(500).send(err);
            }
            else {
              console.log("mongo create user success!")
              let token = jwt.encode({ id: user.id }, secret);
              //Responds with a jwt token and the mongo_id
              res.status(200).json({ token: token })
            }
          });
        }
        else {
          //Throws an error if the username is already in use
          console.log("Error: Username is taken!")
          res.status(500).send("Username is taken")
        }
      }
    });
  },

  //req should be in the form of {token: <jwt token form local storage>, location: <"fridge" or "freezer">, item: <name: <name of food>>}
  addItem: function (req, res) {
    let token = req.body.token;
    let loc = req.body.location;
    let item = req.body.item;

    console.log(item)
    let decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      }
      else {
        if (loc == "fridge") {
          user.fridge.push(item)
        }
        else {
          user.freezer.push(item);
        }

        user.save(function (err, user) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
    });
  },

  //req should be in the form of {token: <jwt token form local storage>, location: <"fridge" or "freezer">, item: <food item to removed>}
  removeItem: function (req, res) {
    let token = req.body.token;
    let loc = req.body.location;
    let item = req.body.item;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      }
      else {
        if (loc == "fridge") {
          for (let i = 0; i < user.fridge.length; i++) {
            if (user.fridge[i].name == item.name && user.fridge[i].quantity == item.quantity) {
              user.fridge.splice(i, 1);
            }
          }
        }
        else {
          for (let i = 0; i < user.freezer.length; i++) {
            if (user.freezer[i].name == item.name && user.freezer[i].quantity == item.quantity) {
              user.freezer.splice(i, 1);
            }
          }
        }

        user.save(function (err, user) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send("Error: unable to update")
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
    });
  },

  //req should be in the form of {token: <jwt token form local storage>, location: <"fridge" or "freezer">, item: <food item to removed>}
  updateItem: function (req, res) {
    let token = req.body.token;
    let loc = req.body.location;
    let oldItem = req.body.oldItem;
    let newItem = req.body.newItem;
    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      }
      else {
        if (loc == "fridge") {
          for (let i = 0; i < user.fridge.length; i++) {
            if (user.fridge[i].name == oldItem.name && user.fridge[i].quantity == oldItem.quantity) {
              user.fridge[i] = newItem;
            }
          }
        }
        else {
          for (let i = 0; i < user.freezer.length; i++) {
            if (user.freezer[i].name == oldItem.name && user.freezer[i].quantity == oldItem.quantity) {
              user.freezer[i] = newItem;
            }
          }
        }

        user.save(function (err, user) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send("Error: unable to update")
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
    });
  },

  getItems: function (req, res) {
    let token = req.query.token;
    let loc = req.query.location;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) {
        console.log("Error: unable to contact database");
        res.status(500).send("Error: unable to contact database");
      }
      else {
        if (loc == 'fridge') {
          res.status(200).json(user.fridge);
        }
        else if (loc == 'freezer') {
          res.status(200).json(user.freezer);
        }
        else {
          res.status(200).json({ freezer: user.freezer, fridge: user.fridge });
        }
      }
    });
  },

  getRecipes: function (req, res) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    let ingredients = req.query.ingredients;

    let uri = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients[0]}`;

    for (let i = 1; i < ingredients.length; i++) {
      uri += `,+${ingredients[i]}`;
    }

    let recipes = [];

    let data = '';

    https.get(uri, (response) => {

      response.on('data', (d) => {
        data += d;
      });

      response.on('end', () => {
        data = JSON.parse(data);
        ids = [];

        for (let i = 0; i < data.length; i++) {
          ids.push(data[i].id);
        }

        for (let i = 0; i < ids.length; i++) {
          let uri = `https://api.spoonacular.com/recipes/${ids[i]}/information?apiKey=${apiKey}&includeNutrition=false`;

          let recipe = '';

          https.get(uri, (response) => {
            response.on('data', (d) => {
              recipe += d;
            });

            response.on('end', () => {
              recipe = JSON.parse(recipe);
              recipes.push(recipe.sourceUrl);
              if (recipes.length == ids.length) {
                res.status(200).json({ recipes: recipes });
              }
            })
          })
        }
      })

    }).on('error', (e) => {
      console.error(e);
    });
  },

  addRecipe: function (req, res) {
    let token = req.body.token;
    let recipe = req.body.recipe;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) { //throws errow if something goes wrong when contacting the database
        console.log("mongo err: ", err);
        res.status(500).send(err);
      }
      else {
        user.recipes.push(recipe);

        user.save(function (err, user) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send("Error: unable to update")
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
    });

  },

  getSavedRecipes: function (req, res) {
    let token = req.query.token;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) {
        console.log("Error: unable to contact database");
        res.status(500).send("Error: unable to contact database");
      }
      else {
        res.status(200).json(user.recipes);
      }
    });
  },

  removeRecipe: function (req, res) {
    let token = req.body.token;
    let recipe = req.body.recipe;

    const decoded = jwt.decode(token, secret);

    User.findById(decoded.id, function (err, user) {
      if (err) {
        console.log("Error: unable to contact database");
        res.status(500).send("Error: unable to contact database");
      }
      else {
        
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i] == recipe) {
            console.log('here')
            user.recipes.splice(i, 1);
          }
        }
        user.save(function (err, user) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send("Error: unable to update")
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful")
          }
        });
      }
    });
  }
};