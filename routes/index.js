const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// Requiring our custom middleware for checking if a user is logged in
// var checkAuth = require("../config/middleware/checkAuth");

// // API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// router.get("/", function(req, res) {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/home");
//   }
//   res.sendFile(path.join(__dirname, "../client/public"));
// });

// router.get("/login", function(req, res) {
//   console.log(req.user);
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     // res.redirect("/home");
//     res.send({
//       status: "success",
//       reason: "user signed in"
//     });
//   } else {
//     console.log(`User is not signed in'`);
//     res.sendFile(path.join(__dirname, "./login.html"));
//   }
// });

// // Here we've add our isAuthenticated middleware to this route.
// // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/isAuthenticated", checkAuth, function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

module.exports = router;
