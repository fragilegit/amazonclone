const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Shipment = db.define('Shipment', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    clerk_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    shipment_date: DataTypes.DATE,
});

module.exports = Shipment;