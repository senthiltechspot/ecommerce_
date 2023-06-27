const categoryController = require("../controllers/category.controllers")
const { authJWT } = require("../middleware");

module.exports = (app) => {
    //Create a new Category
    app.post("/ecomm/api/v1/category", authJWT.adminOnly, categoryController.createCategory)

    //get all the routes
    app.get("/ecomm/api/v1/category", categoryController.getAllCategories);

    //get route by category id
    app.get("/ecomm/api/v1/category/:categoryId", categoryController.getCategoryById);

    //Update a route by given id
    app.put("/ecomm/api/v1/category/:categoryId", authJWT.adminOnly, categoryController.updateCategory);

    // delete A route by a category id
    app.delete("/ecomm/api/v1/category/:categoryId", authJWT.adminOnly, categoryController.deleteCategory);

}