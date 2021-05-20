const express = require('express');
const router = express.Router();
const index_inst_contrl = require('../controllers/indexController');
const auth_inst_contrl = require('../controllers/auth/loginController');
const auth_ctrl = require('../controllers/auth/authentication');
const register_inst_contrl = require('../controllers/auth/registerController');
const valMiddleware = require('../middleware/loginValidation');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

/* GET home page. */
router.get('/', index_inst_contrl.index);

router.get('/about', index_inst_contrl.about);

router.get('/login', forwardAuthenticated, auth_inst_contrl.login);

router.post('/login', auth_inst_contrl.login_post);

router.get('/register', register_inst_contrl.register);

router.post('/register',register_inst_contrl.register_post);

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
   
})

router.get('/search/:id', index_inst_contrl.search);
router.get('/product/:id', index_inst_contrl.product_item);
router.post('/add-to-cart/:id', index_inst_contrl.add_to_cart);
router.get('/cart', index_inst_contrl.cart);
module.exports = router;
