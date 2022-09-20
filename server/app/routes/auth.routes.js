module.exports = app => {
    const authController = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/", authController.post);
    router.get("/", authController.get);



    app.use('/api/auth', router);
};