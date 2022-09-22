const db = require("../models");
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secretKey = require('../config/app.config').secretKey;
const options = require('../config/app.config').options;

const Auth = db.auths;
const Op = db.Sequelize.Op;


exports.signin = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  console.log("Login Attempt : ", username)

  // Check Valid User
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate('local', (passportError, user, info) => {

      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError || !user) {
        res.status(400).json({ message: info.reason });
        return;
      }
      
      // user데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginError) => {
        console.log(req.login)
        if (loginError) {
          res.send(loginError);
          return;
        }

        // 클라이언트에게 JWT생성 후 반환
        const token = jwt.sign({ username }, secretKey, options);
        res.send({ token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


exports.verify = async (req, res, next) => {
  console.log("verify attempt")
  try {
    res.json({ result: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.refresh = (req, res, next) => {
  console.log("refresh token")

  
}
