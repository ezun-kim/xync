module.exports = app => {
    const authController = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/requestToken", authController.requestToken);
    router.post("/login", authController.verify)
    router.get("/", authController.get);
    router.post("/logout", authController.logout)

    app.use('/api/auth', router);
};