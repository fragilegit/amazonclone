const Product = require('../../models/product');
const Category = require('../../models/category');
const Shipment = require('../../models/shipment');
const helper_func = require('../../helpers/functions');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    const products = await Product.findAll({
        where: {
            quantity: {
                [Op.lt]: 15
            }
        }
    })
    let products_fmt = helper_func.format_object(products);

    res.render('dashboard/inventory/index', { title: 'Dashboard', layout: 'dashboard', products: products_fmt });
}

exports.create = (req, res) => {
    res.render('dashboard/category/create', { title: 'Add New Category', layout: 'dashboard' });
}

exports.store = (req, res) => {
    app.upload(req, res, async (err) => {
        if (err) {
            return res.render('dashboard/category/create', {
                msg: err
            })
        }

        file = req.file;

        if (file == undefined) {
            return res.redirect('/dashboard/categories/create');
        }

        const { title, slug, description } = req.body
        const category = await Category.create({
            title: title,
            slug: slug,
            description: description,
            image: file.filename
        }).catch((err) => {
            console.log(err);
        })

        console.log("created: " + category);
        if (category) {
            return res.redirect('/dashboard/categories');
        }

    });
}

exports.edit = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
        console.log("Not found");
    }

    product_formatted = helper_func.format_object(product);

    return res.render('dashboard/inventory/edit', { title: 'Edit Product Stock', layout: 'dashboard', product: product_formatted });
}

exports.update = async (req, res) => {
    const { id } = req.params;
    let { quantity } = req.body;

    const product = await Product.findByPk(id);
    let new_quantity = product.quantity + Number(quantity);

    product.update({ quantity: new_quantity });

    // console.log(quantity);
    const shipment = await Shipment.create({
        product_id: id,
        quantity: quantity
    });

    return res.redirect('/dashboard/inventory');
}

exports.destroy = async (req, res) => {
    const { id } = req.params
    const category = await Category.destroy({
        where: {
            id: id
        }
    });

    return res.redirect('/dashboard/categories');
}