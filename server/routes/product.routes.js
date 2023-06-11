const ProductControllers = require("../controllers/product.controllers")
const { authJWT } = require("../middleware");

module.exports = (app) => {
    // Create a New Product
    app.post("/ecomm/api/v1/products", authJWT.adminOnly, ProductControllers.createProduct)

    // Get all the routes
    app.get("/ecomm/api/v1/products", authJWT.adminOnly, ProductControllers.getAllProducts);

    // Get route by category id
    app.get("/ecomm/api/v1/products/:productId", authJWT.adminOnly, ProductControllers.getProductById);

    // Update a route by given id
    app.put("/ecomm/api/v1/products/:productId", authJWT.adminOnly, ProductControllers.updateProduct);

    // Delete A route by a category id
    app.delete("/ecomm/api/v1/products/:productId", authJWT.adminOnly, ProductControllers.deleteProduct);

    //Find all Products by the Category id
    // app.get("/ecomm/api/v1/category/:categoryid/products/",  ProductControllers.getallproductbycategoryid);


    //Find Product with product the Category id
    // app.get("/ecomm/api/v1/category/:categoryid/products/:productid", requestValidator.validateCategoryAndProductPassed, ProductControllers.findproductundercategory);
}