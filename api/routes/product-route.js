const { Router } = require("express");

const ProductController = require("../controllers/product-controller");
const auth = require("../middlewares/auth");

const router = Router();

router
  .post("/", auth, ProductController.create)
  .get("/", auth, ProductController.get)
  .get("/:id", auth, ProductController.getById)
  .put("/:id", auth, ProductController.updateById)
  .delete("/:id", auth, ProductController.deleteById);

module.exports = router;
