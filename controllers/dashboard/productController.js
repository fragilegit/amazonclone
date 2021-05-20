const Category = require('../../models/category');
const Product = require('../../models/product');
const app = require('../../app');
const helper_func = require('../../helpers/functions');

exports.index = async (req, res) => {
    const products = await Product.findAll();

    let products_formatted = helper_func.format_object(products);

    res.render('dashboard/product/index', { title: 'Product', layout: 'dashboard', products: products_formatted });
}

exports.create = (req, res) => {
    let categories = get_categories();

    categories.then((result) => {
        res.render('dashboard/product/create', { title: 'Add New Product', layout: 'dashboard', categories: result });
    }).catch((err) => {
        console.log(err);
    })


}

exports.store = (req, res) => {
    app.upload(req, res, async (err) => {
        if (err) {
            return res.render('dashboard/product/create', {
                msg: err
            })
        }

        file = req.file;

        if (file == undefined) {
            return res.redirect('/dashboard/product/create');
        }
        console.log(req.body);
        const { price, name, slug, description, category, bestseller } = req.body
        const product = await Product.create({
            price: price,
            name: name,
            description: description,
            category: category,
            bestseller: (bestseller) ? 1 : 0,
            image: file.filename
        }).catch((err) => {
            console.log(err);
        })

        // console.log("created: " + category);
        if (product) {
            return res.redirect('/dashboard/products');
        }

    });
}

exports.edit = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
        console.log("Not found");
        res.redirect('/dashboard/products')
    }

    product_formatted = helper_func.format_object(product);
    categories = get_categories();

    categories = categories.then((result) => {
        return res.render('dashboard/product/edit', { title: 'Edit Product', layout: 'dashboard', product: product_formatted, categories: result });
    }).catch((err) => {
        console.log(err);
    })

}

exports.update = (req, res) => {
    app.upload(req, res, async (err) => {
        const { id } = req.params;

        if (err) {
            return res.render(`/dashboard/products/edit/${id}`, {
                msg: err
            })
        }

        

        const { price, quantity, name, slug, description, category, bestseller } = req.body

        const product = await Product.findByPk(id);
        file = req.file;
        if(!file){
            file = product.image;
        }
        
        if (file == undefined) {
            return res.redirect(`/dashboard/products/edit/${id}`);
        }

        product.update({
            price: price,
            quantity: quantity,
            name: name,
            description: description,
            category: category,
            bestseller: (bestseller) ? 1 : 0,
            image: file.filename
        });

        // console.log("created: " + category);
        if (product) {
            return res.redirect('/dashboard/products');
        }

    });
}

exports.destroy = async (req, res) => {
    const { id } = req.params
    const product = await Product.destroy({
        where: {
            id: id
        }
    });

    return res.redirect('/dashboard/products');
}

get_categories = async () => {
    const categories = await Category.findAll();
    const categories_formatted = helper_func.format_object(categories)

    return categories_formatted;
}