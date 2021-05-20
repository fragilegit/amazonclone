const Category = require('../../models/category');
const app = require('../../app');
const helper_func = require('../../helpers/functions');

exports.index = async (req, res) => {
    const categories = await Category.findAll();

    let categories_formatted = helper_func.format_object(categories);

    res.render('dashboard/category/index', { title: 'Category', layout: 'dashboard', categories: categories_formatted });
}

exports.create = (req, res) => {
    res.render('dashboard/category/create', { title: 'Add New Category', layout: 'dashboard' });
}

exports.store = (req, res) => {
    app.upload(req, res, async (err) => {

        if (err) {
            console.log(err);
            return res.render('dashboard/category/create', {
                title: 'Add New Category', layout: 'dashboard',
                msg: err
            })
        }

        file = req.file;

        if (file == undefined) {
            console.log(file);
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

    const category = await Category.findByPk(id);

    if (!category) {
        console.log("Not found");
    }

    category_formatted = helper_func.format_object(category);

    return res.render('dashboard/category/edit', { title: 'Edit Category', layout: 'dashboard', category: category_formatted });
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, slug, description } = req.body;

    const category = await Category.findByPk(id);

    category.update({ title: title, slug: slug, description: description });

    return res.redirect('/dashboard/categories');
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