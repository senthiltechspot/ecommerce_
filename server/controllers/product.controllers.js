const Category = require('../models/category.model');
const Product = require('../models/product.model');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, qty, originalPrice, offerPrice, imageUrl, categoryId } = req.body;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const product = await Product.create({ name, description, qty, originalPrice, offerPrice, imageUrl, CategoryId: categoryId });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, qty, originalPrice, offerPrice, imageUrl, categoryId } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.qty = qty;
        product.originalPrice = originalPrice;
        product.offerPrice = offerPrice;
        product.imageUrl = imageUrl;
        product.CategoryId = categoryId;
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
