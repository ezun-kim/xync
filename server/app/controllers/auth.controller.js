const db = require("../models");
const jwt = require('jsonwebtoken');
const secretKey = require('../config/app.config').secretKey;
const options = require('../config/app.config').options;

const Auth = db.auths;
const Op = db.Sequelize.Op;


exports.requestToken = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // Create JWT
  const result = jwt.sign({username}, secretKey, options)
  console.log("Create JWT : ", result)

  // Send created JWT to the app
  res.send(result)

  // if (req.isAuthenticated()) {
  //   return res.redirect('/');
  // }
  // passport.authenticate('local', (authError, user, info) => {
  //   if (authError) {
  //     console.error(authError);
  //     return next(authError);
  //   }
  //   if (!user) {
  //     return res.json(info);
  //   }
  //   return req.login(user, (loginError) => {
  //     if (loginError) {
  //       console.error(loginError);
  //       return next(loginError);
  //     }
  //     return res.json({ user });
  //   });
  // })(req, res, next);
};

exports.verify = async (req, res) => {
   decoded = ""
  try {
      decoded = jwt.verify(token, secretKey);
  } catch (err) {
      if (err.message === 'jwt expired') {
          console.log('expired token');
          return "Token expired";
      } else if (err.message === 'invalid token') {
          console.log('Invalid token');
          return "Invalid token";
      } else {
          console.log("Unexpected token");
          return "Unexpected token";
      }
  }
  return decoded;
}

exports.get = (req, res) => {
  // if (req.isAuthenticated() && req.user) {
  //   return res.json({ user: req.user });
  // }
  // return res.json({ user: null });
};

exports.logout = (req, res, next) => {
    // req.logout((err) => {
    // if (err) { 
    //   return next(err)
    // }

    // return res.json({ user: null })
    // req.session.save(()=>{
    //   // res.redirect('/')
    // })  
  // }
}