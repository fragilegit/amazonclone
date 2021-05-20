// const models = require('../../models/index');
const User = require('../../models/user_test')
const bcrypt =require('bcryptjs');
const Category = require('../../models/category');
const helper_func = require('../../helpers/functions');

const { NetworkAuthenticationRequire } = require('http-errors');
const passport = require('passport');

let categories_formatted;
let category_limit;

const categories = Category.findAll().then((result) => {
    categories_formatted = helper_func.format_object(result);
});

const categories_ltd = Category.findAll({ limit: 4 }).then((result) => {
    category_limit = helper_func.format_object(result);
})

exports.login = (req, res, next) => {
    res.render('auth/login', { title: 'Login', categories: categories_formatted, categories_ltd: category_limit });
}

// exports.login_post = async (req, res, next) => {
//     const {email, password} = req.body;

//     const user = await User.findOne({
//         where: {email, email}
//     })

//     const errors = []
//     // console.log(user);
//     if(!user || user == null){
//         errors.push({msg: 'email does not exist', status: 'danger'})
//         // res.status(401).end('email does not exist');
//     }
//     let isValid = false;
//     if (user){
//         isValid =  await bcrypt.compare(password, user.password)
//     }
    
//     if(!isValid){
//         errors.push({msg: 'email or password invalid', status: 'warning'})
//         // res.status(401).end('username or password invalid');
//     }
//     if(isValid){
//         errors.push({msg: 'success', status: 'success'});
//         // user_sess = req.session.user
//         // if(!user_sess){
//         //     user_sess.user = 'test';
//         // }
//         try {
//             console.log(req.session.user);
//         }catch(err){
//             console.log(err)
//             next(err)
//         }
        
//         // console.log(user)
//         return res.redirect('/dashboard');
//     }
//     // req.session.user = {
//     //     isAuthenticated: true
//     // }
//     res.render('auth/login', {
//         errors
//     })
//     // res.end('success');

// }

exports.login_post = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  };