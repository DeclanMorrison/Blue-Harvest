//Where we make all our calls for recipe searches and such - izaak
// Grabbing our models
const router = require("express").Router();
const controller = require("../../controllers/controller.js");
const passport = require("../../config/passport");

// // login section
router.post("/signup", controller.signup);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    console.log(`req body -${req.user}`);
    res.json({
      message: "user authenticated",
      user: req.user
    });
  }
);

// save recipe
router.post("/saveRecipe", controller.saveRecipe);

// get favorites
router.get("/getFavorites", controller.getFavorites);

router.delete("/removeFavorite", controller.removeFavorite);

// Route for logging user out
router.get("/logout", controller.logout);

module.exports = router;
