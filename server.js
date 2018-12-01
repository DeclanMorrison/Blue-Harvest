const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");

// Requiring passport as we've configured it
let passport = require("./config/passport");

const sequelize = require("sequelize");

// const routes = require("./routes");
const app = express();
var db = require("./models");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport stuff
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
// app.use(cookieParser('cookit'));
app.use(
  session({ 
    secret: "cookit", 
    name: "cookit_Cookie"
   })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// the view files are JavaScript files, hence the extension
app.set('view engine', 'js');

// the directory containing the view files
app.set('pages', './');

// Add routes, both API and view
app.use(routes);

// Syncing our database and logging a message to the user upon success
db.connection.sync().then(function() {
  console.log("\nDB connected\n")
  // Start the API server
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
module.exports = app;
