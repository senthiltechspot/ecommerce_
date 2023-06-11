const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Place an order
exports.placeOrder = async (req, res) => {
    const {
        userId,
        address,
        phoneNumber,
        email,
        paymentMode,
        paymentStatus,
        orderStatus,
        paymentDetails,
        trackingDetails,
        products,
    } = req.body;

    try {
        const order = await Order.create({
            userId,
            address,
            phoneNumber,
            email,
            paymentMode,
            paymentStatus,
            orderStatus,
            paymentDetails,
            trackingDetails,
        });

        // Add products to the order
        for (const product of products) {
            await order.addProduct(product.id, { through: { quantity: product.quantity } });

            // Update the product quantities
            const updatedQuantity = product.qty - product.quantity;
            await Product.update({ qty: updatedQuantity }, { where: { id: product.id } });
        }

        res.json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId);

        // Check if the order is cancellable
        if (order.orderStatus === 'Cancelled') {
            return res.status(400).json({ error: 'Order is already cancelled' });
        }

        // Update the order status to 'Cancelled'
        await Order.update({ orderStatus: 'Cancelled' }, { where: { id: orderId } });

        // Restore the product quantities
        const products = await order.getProducts();
        for (const product of products) {
            const updatedQuantity = product.qty + product.OrderProduct.quantity;
            await Product.update({ qty: updatedQuantity }, { where: { id: product.id } });
        }

        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
