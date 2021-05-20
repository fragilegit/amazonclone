const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    image: { type: DataTypes.STRING, required: true, unique: true },
});


module.exports = Category;