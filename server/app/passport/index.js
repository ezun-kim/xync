const passport = require('passport');
const {
    Strategy: LocalStrategy
} = require('passport-local');
const {
    ExtractJwt,
    Strategy: JWTStrategy
} = require('passport-jwt');

const bcrypt = require('bcrypt');

const passportConfig = {
    usernameField: 'username',
    passwordField: 'password'
};


const Users = require('../models').users

const passportVerify = async (username, password, done) => {
    try {
        // 유저 아이디로 일치하는 유저 데이터 검색
        const user = await Users.findOne({
            where: {
                username
            }
        });

        // 검색된 유저 데이터가 없다면 에러 표시
        if (!user) {
            done(null, false, {
                reason: 'User not found'
            });
            return;
        }

        // 검색된 유저 데이터가 있다면 유저 해쉬된 비밀번호 비교 
        const compareResult = user.password == password //await bcrypt.compare(password, user.password);

        // 해쉬된 비밀번호가 같다면 유저 데이터 객체 전송
        if (compareResult) {
            done(null, user);
            return;
        }
        // 비밀번호가 다를경우 에러 표시
        done(null, false, {
            reason: 'Wrong password'
        });
    } catch (error) {
        console.error(error);
        done(error);
    }
};


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'xYnC1@3$',
};

const jwtVerify = async (jwtPayload, done) => {
    console.log("JWT Verify : ", jwtPayload.username)

    try {
        // payload의 id값으로 유저의 데이터 조회
        const user = await Users.findOne({
            where: {
                username: jwtPayload.username
            }
        });

        // 유저 데이터가 있다면 유저 데이터 객체 전송
        if (user) {
            done(null, user);
            return;
        }

        // 유저 데이터가 없을 경우 에러 표시
        done(null, false, {
            reason: 'Invalid token'
        });
    } catch (error) {
        console.error(error);
        done(error);
    }
};


module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig, passportVerify));
    passport.use('jwt', new JWTStrategy(jwtOptions, jwtVerify));
    passport.initialize();
};