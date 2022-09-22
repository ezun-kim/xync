const passport = require('passport');

module.exports = app => {
    const authController = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/signin", authController.signin);
    router.post("/refresh", authController.refresh)
    
    // router.get("/", authController.get);
    // router.post("/logout", authController.logout)

    router.post('/verify', passport.authenticate('jwt', { session: false }), authController.verify);

    app.use('/api/auth', router);
};