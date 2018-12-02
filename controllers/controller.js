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
    req.logout();
    res.json({
      message: "user logged out"
    });
    console.log(`signing out ${req.body.id}`);
    req.logout();
    res.redirect("/");
  },

  saveRecipe: (req, res) => {
    console.log(`logging req.user  ${JSON.stringify(req.user)}\n`);

    if (req.isAuthenticated()) {
      let recipe = req.body;
      let userID = req.user.id;
      // add to our database
      db.Favorite.create({
        userID: userID,
        label: recipe.name,
        image: recipe.image,
        url: recipe.url,
        ingredients: JSON.stringify(recipe.ingredients)
      })
        .then(data => {
          return res.json({ data: data });
        })
        .catch(function(err) {
          console.log(err);
          return res.json({ err });
        });
    } else {
      console.log("no user");
      res.json({ message: "user not signed in" });
    }
  },

  getFavorites: (req, res) => {
    console.log(`logging req.user - ${JSON.stringify(req.user)}\n`);
    if (req.isAuthenticated()) {
      let userID = req.user.id;
      // add to our database
      db.Favorite.findAll({
        where: {
          userID: userID
        }
      })
        .then(data => {
          // console.log(`DB query result is ${JSON.stringify(data)}`)
          return res.json({ hits: data });
        })
        .catch(function(err) {
          console.log(err);
          return res.json({ err });
        });
    } else {
      console.log("no user");
      return res.json({ message: "user not signed in" });
    }
  },

  removeFavorite: (req, res) => {
    console.log(`Removing favorite by ID ${JSON.stringify(req.body)}`);
    let deleteID = req.body.recipeID;
    db.Favorite.destroy({
      where: { id: deleteID }
    }).then(result => {
      console.log(result)
      return res.json({ message: `recipe removed from favorites` });
    });
  },

};
