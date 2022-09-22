const express = require("express");
const session = require("express-session")
const cors = require("cors");

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


const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });


// AuthService.logout()
//         .then((response: ResponseData) => {
//           if (response.data.user == undefined) {
//             store.commit("user/set", null)
//             this.$router.push({ name: "login" });
//           }
//           else {
//             alert(response.data.message)
//           }
//         })
//         .catch((e: Error) => {
//           console.log(e);
//         });

const tutorials = require("./app/controllers/tutorial.controller.js");
app.get('/login', tutorials.login);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



// app.use(cookieParser(appConfig.COOKIE_SECRET));
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: appConfig.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   }
// }));

require("./app/routes/turorial.routes")(app);
require("./app/routes/auth.routes")(app);
