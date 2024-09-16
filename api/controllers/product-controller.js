const ProductService = require("../services/product-service");

const productService = new ProductService();

class ProductController {
  static async create(req, res) {
    const { name, description, productCategoryId } = req.body;

    try {
      await productService.create({
        name,
        description,
        productCategoryId,
      });

      return res.status(201).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const products = await productService.get();

      res.status(200).json(products);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const product = await productService.getById(id);

      return res.status(200).json(product);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { name, description, productCategoryId } = req.body;

    try {
      const product = await productService.updateById({
        id,
        name,
        description,
        productCategoryId,
      });

      return res.status(200).json(product);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await productService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ProductController;
