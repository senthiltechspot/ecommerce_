const orderController = require("../controllers/order.controller");
const { authJWT } = require("../middleware")

module.exports = (app) => {
    // Get All Users
    app.post("/ecomm/api/v1/order", authJWT.verifyToken, orderController.placeOrder);

    // Update User By id
    app.put("/ecomm/api/v1/order/:orderId", authJWT.verifyToken, orderController.cancelOrder);
}