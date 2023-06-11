const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalCartPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
});

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: 'CartItem' });
Product.belongsToMany(Cart, { through: 'CartItem' });

module.exports = Cart;
