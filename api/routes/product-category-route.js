const { Router } = require("express");

const ProductCategoryController = require("../controllers/product-category-controller");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

const router = Router();

router
  .post("/", auth, upload.single("image"), ProductCategoryController.create)
  .get("/", auth, ProductCategoryController.get)
  .get("/:id", auth, ProductCategoryController.getById)
  .put(
    "/:id",
    auth,
    upload.single("image"),
    ProductCategoryController.updateById
  )
  .delete("/:id", auth, ProductCategoryController.deleteById)
  .delete("/i/:id", auth, ProductCategoryController.deleteImage);

module.exports = router;
