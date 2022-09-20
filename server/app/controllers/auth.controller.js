const db = require("../models");
var passport = require('passport');
const Auth = db.auths;
const Op = db.Sequelize.Op;


exports.post = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.json(info);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json({ user });
    });
  })(req, res, next);
};

exports.get = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json({ user: req.user });
  }
  return res.json({ user: null });
};
