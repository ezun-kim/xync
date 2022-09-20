const LocalStrategy = require('passport-local').Strategy;
const users = require('../data/users.json');


exports.config = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        const result = users.filter((user) => user.username === username);
        if (result.length > 0) {
            done(null, result[0]);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, (username, password, done) => {
        console.log(username, password)
        const result = users.filter((user) => user.username === username);
        if (result.length > 0) {
            const user = result[0];
            if (password === user.password) {
                done(null, user);
            } else {
                done(null, false, { message: "비밀번호 틀림" });
            }
        } else {
            done(null, false, { message: "가입되지 않은 회원"});
        }
    }));
};