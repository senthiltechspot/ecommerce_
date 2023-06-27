// productController.js

const Product = require('../models/product.model');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const productData = req.body;

    try {
        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const productData = req.body;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(productData);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
