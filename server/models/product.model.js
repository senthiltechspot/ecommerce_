const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category.model'); // Import the Category model

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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  offerPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT, // Use TEXT data type for image URLs
    allowNull: true,
    get() {
      const imageUrl = this.getDataValue('imageUrl');
      return imageUrl ? JSON.parse(imageUrl) : [];
    },
    set(value) {
      this.setDataValue('imageUrl', JSON.stringify(value));
    },
  },
});

// Associations
Product.belongsTo(Category);

module.exports = Product;
