'user strict';

const passport = require('passport');

signinUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user){
            return res.status(400).send(info);
        }

        req.logIn(user, (err)=>{
            if(err){
                return next(err);
            }
            // if i decide to send a json res instead of redirect
            // res.status(200).json(user);

            res.rediect('/dashboard')
        });
    })(req, res, next);
}

module.exports.signin = signinUser;