const Category = require('../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        category.name = name;
        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
