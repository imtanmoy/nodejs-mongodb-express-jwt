const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
// const passportJWT = require("passport-jwt");
const User = require("../models/user.model");

// Local strategy
const localOpts = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(
    localOpts,
    async(email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false);
            } else if (!user.authenticateUser(password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    }
);


passport.use(localStrategy);
const authLocal = passport.authenticate('local', { session: false });
module.exports = authLocal;