const express = require("express");

const userRoute = require("./user-route");
const authRoute = require("./auth-route");
const productCategoryRoute = require("./product-category-route");
const productRoute = require("./product-route");
const productImageRoute = require("./product-image-route");

const router = express.Router();

router
  .use("/user", userRoute)
  .use("/auth", authRoute)
  .use("/product-category", productCategoryRoute)
  .use("/product", productRoute)
  .use("/product-image", productImageRoute);

module.exports = router;
