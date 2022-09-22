const express = require("express");
const session = require("express-session")
const cors = require("cors");
const passport = require('passport');
const passportConfig = require('./app/passport');

const appConfig = require("./app/config/app.config.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 패스포트 초기화
app.use(passport.initialize());
passportConfig();

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


const tutorials = require("./app/controllers/tutorial.controller.js");
app.get('/login', tutorials.login);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


require("./app/routes/turorial.routes")(app);
require("./app/routes/auth.routes")(app);
