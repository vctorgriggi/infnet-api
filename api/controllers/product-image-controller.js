const ProductImageService = require("../services/product-image-service");
const deleteFile = require("../utils/delete-file");

const productImageService = new ProductImageService();

class ProductCategoryController {
  static async create(req, res) {
    const { productId } = req.params;
    const imageUrl = req.file ? req.file.path : null;

    try {
      await productImageService.create({
        imageUrl,
        productId,
      });

      return res.status(201).send();
    } catch (error) {
      if (imageUrl) deleteFile(imageUrl);
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      const productImage = await productImageService.getById(id);

      await productImageService.deleteById(id);

      deleteFile(productImage.imageUrl);

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ProductCategoryController;
