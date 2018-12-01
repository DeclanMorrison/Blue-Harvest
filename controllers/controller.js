const db = require("../models");
var passport = require("../config/passport");

module.exports = {

  signup: (req, res) => {
    let newuser = req.body;
    // check if email is already in database, error out if true
    db.User.findAll({
      where: {
        email: newuser.email
      }
    }).then(function(result) {
      console.log(result.length);
      if (result.length != 0) {
        console.log(`\nEmail already taken! \n`);
        res.send({
          status: "failed",
          reason: "email already taken"
        });
      } else {
        db.User.create({
          firstName: newuser.firstName,
          lastName: newuser.lastName,
          email: newuser.email,
          password: newuser.password
        })
          .then(data => {
            res.json({ data: data });
          })
          .catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
          });
      }
    });
  },

  logout: (req, res) => {
    console.log(`signing out ${req.body.id}`);
    req.logout();
    res.redirect("/");
  },

  saveRecipe: (req, res) => {
      console.log(`logging req.user  ${JSON.stringify(req.user)}\n`);
    
      if (req.isAuthenticated()) {
        let recipe = req.body
        let userID = req.user.id;
        // add to our database
        db.Favorite.create({
          userID: userID,
          recipe: recipe.name,
          image: recipe.image,
          url: recipe.url,
          ingredients: JSON.stringify(recipe.ingredients)
        })
          .then(data => {
           return res.json({ data: data });;
          })
          .catch(function(err) {
            console.log(err);
            return res.json({err});
          });
      } else {
        console.log("no user");
        res.json({ message: "user not signed in" });
      }
    },

  getFavoriteRecipes: (req, res) => {
    console.log("\nRetreiving all favorited recipes...\n");
    db.Recipes.findAll({}).then(dbRecipes => {
      res.send("it worked finally");
    });
    ss;
  },

  findOneFavorite: (req, res) => {
    console.log("\nRetreiving recipe...\n");
    db.Favorites.findOne({
      where: { recipeID: req.recipeID }
    }).then(dbUser => {
      console.log(dbUser);
      res.redirect("/");
    });
  },

  findRecipes: (req, res) => {
    axios
      .get(
        "https://api.edamam.com/search?q=chicken&app_id=f457772e&app_key=47c5a1d77ba0337a17e3f917071f5c6e"
      )
      .then(results => {
        console.log(results.data.hits[1]);
        res.send({
          results
        });
      })
      .catch(error => {
        console.log(`Error in query: ${error}`);
      });
  },

  getUserData: (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  }
};
