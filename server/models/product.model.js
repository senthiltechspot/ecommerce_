const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category.model');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pictures: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  smPictures: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  shortDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  brands: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ratings: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reviews: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  variants: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  top: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  new: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

// Associations
Product.belongsTo(Category);

module.exports = Product;
