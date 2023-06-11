const authController = require("../controllers/auth.controller")
const { authJWT } = require("../middleware")
module.exports = (app) => {
    // Signup
    app.post("/ecomm/api/v1/auth/signup", authController.signup)

    // Login
    app.post("/ecomm/api/v1/auth/login", authController.login)
}