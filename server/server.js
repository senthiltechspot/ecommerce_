const express = require("express");
const sequelize = require("./config/database")
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();

app.use(bodyParser.json());


sequelize.sync({ force: false })
    .then(() => {
        console.log("DB synced");
    })



// impoted Auth routes
require("./routes/auth.routes")(app);

// impoted category routes
require("./routes/category.routes")(app);

// import Product routes
require("./routes/product.routes")(app);

// import User routes 
require("./routes/user.routes")(app);

// import Cart routes 
require("./routes/cart.routes")(app)

// import Order routes 
require("./routes/order.routes")(app)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Application is Running on Port ${process.env.PORT || 5000}`);
})