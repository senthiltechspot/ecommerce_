const { authJWT } = require("../middleware");
const cartControllers = require("../controllers/cart.controller");

module.exports = function (app) {
    // Create a Cart
    app.post("/ecomm/api/v1/carts", authJWT.verifyToken, cartControllers.createCart);

    // Add an item to the cart
    app.put("/ecomm/api/v1/carts", authJWT.verifyToken, cartControllers.addItemToCart);

    // Remove an item from the cart
    app.put("/ecomm/api/v1/carts", authJWT.verifyToken, cartControllers.removeItemFromCart);

    // Get cart by user ID
    app.get("/ecomm/api/v1/carts/:userId", authJWT.verifyToken, cartControllers.getCartByUserId);

    // Delete a cart
    app.delete("/ecomm/api/v1/carts/products/:cartId", authJWT.verifyToken, cartControllers.deleteCart);

}