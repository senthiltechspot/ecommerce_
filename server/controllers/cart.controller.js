// controllers/cartController.js

const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Create a cart
exports.createCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const cart = await Cart.create({ userId });
        res.json({ message: 'Cart created successfully', cartId: cart.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add an item to the cart
exports.addItemToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findByPk(cartId);

        // If cart doesn't exist, create a new cart
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        const product = await Product.findByPk(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the product quantity is sufficient
        if (product.qty < quantity) {
            return res.status(400).json({ error: 'Insufficient product quantity' });
        }

        // Check if the item already exists in the cart
        const item = await cart.getProducts({ where: { id: productId } });

        if (item.length > 0) {
            // Update the item quantity
            await cart.addProduct(productId, { through: { quantity } });
        } else {
            // Add the item to the cart
            await cart.addProduct(productId, { through: { quantity } });
        }

        // Update the cart total price
        const totalPrice = cart.totalPrice + product.offerPrice * quantity;
        await Cart.update({ totalPrice }, { where: { id: cartId } });

        res.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
    const { cartId, productId } = req.body;
    try {
        const cart = await Cart.findByPk(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the item exists in the cart
        const item = await cart.getProducts({ where: { id: productId } });

        if (item.length === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Remove the item from the cart
        await cart.removeProduct(productId);

        // Update the cart total price
        const totalPrice = cart.totalPrice - product.offerPrice * item[0].CartItem.quantity;
        await Cart.update({ totalPrice }, { where: { id: cartId } });

        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
    const { cartId } = req.body;
    try {
        const cart = await Cart.findByPk(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        await cart.destroy();

        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
