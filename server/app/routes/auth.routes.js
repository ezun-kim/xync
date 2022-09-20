module.exports = app => {
    const authController = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/", authController.post);
    router.get("/", authController.get);
    router.post("/logout", authController.logout)

    app.use('/api/auth', router);
};