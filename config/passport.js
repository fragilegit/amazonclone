'user strict';

const passport = require('passport');
const sequelize = require('sequelize');
const User = require('../models/user_test');

module.exports.init = (app) => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        user = await User.findByPk(id)
        return done(null, user);
    });

    require('./strategies/local')();
}