const Category = require('../models/category');
const Product = require('../models/product');
const helper_func = require('../helpers/functions');
const uuid = require('uuid');

let categories_formatted;
let category_limit;

const categories = Category.findAll().then((result) => {
    categories_formatted = helper_func.format_object(result);
});

const categories_ltd = Category.findAll({ limit: 4 }).then((result) => {
    category_limit = helper_func.format_object(result);
})


exports.index = async (req, res, next) => {
    const products = await Product.findAll({ limit: 4 })
    const products_bestseller = await Product.findAll({
        where: { bestseller: 1 },
        limit: 5
    })

    let products_formatted = helper_func.format_object(products);
    let products_bestseller_formatted = helper_func.format_object(products_bestseller);

    let category_limits;

    category_limits = await Category.findAll({ limit: 4 });
    category_limit_fmt = helper_func.format_object(category_limits);
    
    // console.log(category_limit_fmt)
    res.render('index', {
        title: 'MirrorMe', categories: categories_formatted, products: products_formatted,
        products_bs: products_bestseller_formatted, categories_ltds: category_limit_fmt
    });
}

exports.about = (req, res, next) => res.render('index', { title: 'About' });

exports.search = async (req, res) => {
    const { id } = req.params;

    let products = await Product.findAll({
        where: {
            category: id
        }
    });

    if (!products) {
        console.log('No products')
    }

    products_formatted = helper_func.format_object(products);
    console.log(categories_formatted);
    return res.render('product', { categories: categories_formatted, products: products_formatted, categories_ltd: category_limit });
}

exports.product_item = async (req, res) => {
    const { id } = req.params;

    let product = await Product.findByPk(id);

    if (!product) {
        console.log('No product found');
    }

    product_formatted = helper_func.format_object(product);
    console.log(product_formatted);
    return res.render('product_item', { categories: categories_formatted, product: product_formatted, categories_ltd: category_limit });
}

exports.add_to_cart = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body

    if (req.session.cart) {
        let cart = req.session.cart
        let exist = false;

        cart.filter((item) => {
            let item_id = item.id;
            if (id == item_id) {
                item.quantity += Number(quantity);
                exist = true;
            }
        });

        if (!exist) {
            cart.push({ 'id': id, 'quantity': Number(quantity) });
        }

        // console.log(req.session.cart);
    } else {
        req.session.cart = [{ 'id': id, 'quantity': Number(quantity) }]
        req.session.visitor = uuid.v1();
    }

    return res.send({ 'success': 'Item Added to cart' });
}

exports.cart = (req, res) => {
    const cart = req.session.cart
    const visitor_id = req.session.visitor;

    if (!cart) {
        console.log('cart empty');
    }
    // console.log(cart);

    if (!cart) {
        return res.render('cart', {message: 'Your cart is empty', categories: categories_formatted, categories_ltd: category_limit });
    }

    let cart_arr = [];
    let total_arr = [];
    let total_cost = 0;
    cart.forEach(async (item) => {
        if(item.quantity < 1){
            res.render('cart', { message: 'Your cart is empty', categories: categories_formatted, categories_ltd: category_limit });
        }

        const product = await Product.findByPk(item.id);
        
        let product_formatted = helper_func.format_object(product);

        console.log("Found: " + product_formatted.name);
        let item_cost = item.quantity * product_formatted.price;
        total_cost += Number(item_cost);
        total_arr[0] = total_cost;
        cart_arr.push({ 'qty': item.quantity, 'item': product_formatted, 'item_cost': item_cost });
        
        // total_arr = 
        // total_arr.push({ 'total': total_cost });
        // console.log("cart arry qty: " + cart_arr[0].qty);
        // console.log("cart arry item: " + cart_arr[0].item.name);
        // console.log("array sie: " + (total_arr.length - 1));
        // total_arr[0] = total_arr[(total_arr.lenght - 1)].total
        
    });
    
    res.render('cart', { products: cart_arr, total: total_arr, categories: categories_formatted, categories_ltd: category_limit });
}


get_product_by_pk = async (id) => {
    let product = await Product.findByPk(id);

    if (!product) {
        console.log('No product found');
        return false;
    }
    product_formatted = helper_func.format_object(product);
    return product_formatted
}