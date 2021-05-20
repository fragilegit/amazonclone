const Category = require('../models/category');

exports.format_object = (object) => {
    let to_str = JSON.stringify(object);
    let object_formatted = JSON.parse(to_str);

    return object_formatted;
}
format_objects = (object) => {
    let to_str = JSON.stringify(object);
    let object_formatted = JSON.parse(to_str);

    return object_formatted;
}
exports.get_categories = async () => {
    const categories = await Category.findAll();
    const categories_formatted = format_objects(categories)
    // console.log(categories_formatted)
    return categories_formatted;
}