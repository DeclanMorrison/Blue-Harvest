const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// Requiring our custom middleware for checking if a user is logged in
// var checkAuth = require("../config/middleware/checkAuth");

// // API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;
