const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Get User model
const User = require('../models/user_test');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if(!user){
                    return done(null, false, {message: 'Email not registered'});
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                    return done(null, user);
                    } else {
                    return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
        })
    )
}