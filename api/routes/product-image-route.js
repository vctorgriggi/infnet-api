const { Router } = require("express");

const ProductImageController = require("../controllers/product-image-controller");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

const router = Router();

router
  .post(
    "/p/:productId",
    auth,
    upload.single("image"),
    ProductImageController.create
  )
  .delete("/:id", auth, ProductImageController.deleteById);

module.exports = router;
