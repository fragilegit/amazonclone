
// const models = require('../../models/index');
const User = require('../../models/user_test')
const bcrypt = require('bcryptjs');
const { check, validationResult, body } = require('express-validator');
const Category = require('../../models/category');
const helper_func = require('../../helpers/functions');

let categories_formatted;
let category_limit;

const categories = Category.findAll().then((result) => {
    categories_formatted = helper_func.format_object(result);
});

const categories_ltd = Category.findAll({ limit: 4 }).then((result) => {
    category_limit = helper_func.format_object(result);
})

exports.register = (req, res, next) => res.render('auth/register', { title: 'Register', categories: categories_formatted, categories_ltd: category_limit });

exports.register_post =
    async (req, res) => {
        const { first_name, last_name, email, password, password_confirmation } = req.body
        const messages = [];
        const errors = [];
        // const new_user = models.User.create({first_name: name, last_name: name, email: email, password: password});
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const [user, created] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    // add values here
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hash
                }
            });

            if (!created) {
                messages.push({ msg: 'Email already registered', status: 'warning' });

            } else {
                messages.push({ msg: 'Successfully registered, please login', status: 'success' });
                res.redirect('/login')
            }
            // req.session.user = {
            //     isAuthenticated: true
            // }

            return res.render('auth/register', {
                messages,
                email,
                password,
                password
            })

            //     console.log("user"+user.email);
            // });


            res.status(200).end();

        } catch (err) {
            console.log(err);
            res.redirect('/register');
        }


        // let errors = [];

        // // validate requied feilds
        // if(!name || !email || !password || !password_confirmation){
        //     errors.push({msg: 'Please fill in all fields' });
        // }

        // if(password != password_confirmation){
        //     errors.push({msg: 'Passwords do not match'});
        // }

        // if(password.length < 6){
        //     errors.push({msg: 'Password should be at least 6 characters' });
        // }

        // if(errors.length > 0){
        //     console.log('not valid', errors);
        //     res.render('auth/register', {
        //         errors,
        //         name,
        //         email,
        //         password,
        //         password
        //     })
        // }else{
        //     console.log('valid');

        //

        //     // check if user already exists
        // }
        // res.send('hello');
    }