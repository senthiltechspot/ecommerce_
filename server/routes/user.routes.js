const userController = require("../controllers/user.controller");
const { authJWT } = require("../middleware")

module.exports = (app) => {
    // Get All Users
    app.get("/ecomm/api/v1/users", authJWT.adminOnly, userController.getAllUsers);

    // Get a single user by ID
    app.get("/ecomm/api/v1/users/:userId", authJWT.adminOnly, userController.getUserById);

    // Delete a user By id
    app.delete("/ecomm/api/v1/users/:userId", authJWT.adminOnly, userController.deleteUser);

    // Update User By id
    app.put("/ecomm/api/v1/users/", authJWT.verifyToken, userController.updateUser);

    // Upgrade User to Admin
    app.put("/ecomm/api/v1/users/", authJWT.adminOnly, userController.upgradeUser);

}