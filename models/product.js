const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    cost_price: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.INTEGER,
    bestseller: DataTypes.INTEGER,
    image: { type: DataTypes.STRING, required: true, unique: true },
});

module.exports = Product;