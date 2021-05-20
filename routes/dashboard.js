const express = require('express');
const router = express.Router();
const index_inst_contrl = require('../controllers/dashboard/dashboardController');
const product_inst_contrl = require('../controllers/dashboard/productController');
const category_inst_contrl = require('../controllers/dashboard/categoryController');
const inventory_inst_ctrl = require('../controllers/dashboard/inventoryController');
const app = require('../app');
const valMiddleware = require('../middleware/loginValidation');
const { ensureAuthenticated } = require('../middleware/auth');


/* GET home page. */
router.get('/', index_inst_contrl.index);

router.get('/products', product_inst_contrl.index);
router.get('/products/create', product_inst_contrl.create);
router.post('/products/store', product_inst_contrl.store);
router.get('/products/edit/:id', product_inst_contrl.edit);
router.post('/products/update/:id', product_inst_contrl.update);
router.delete('/products/delete/:id', product_inst_contrl.destroy);

router.get('/categories', category_inst_contrl.index);
router.get('/categories/create', category_inst_contrl.create);
router.post('/categories/store', category_inst_contrl.store);
router.get('/categories/edit/:id', category_inst_contrl.edit);
router.post('/categories/update/:id', category_inst_contrl.update);
router.delete('/categories/delete/:id', category_inst_contrl.destroy);

router.get('/inventory', inventory_inst_ctrl.index);
router.get('/inventory/edit/:id', inventory_inst_ctrl.edit);
router.post('/inventory/update/:id', inventory_inst_ctrl.update);

module.exports = router;
