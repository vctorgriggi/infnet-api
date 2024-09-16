const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class ProductImageService {
  async create(dto) {
    try {
      if (!dto.imageUrl) {
        throw new Error("Image is required.");
      }

      if (dto.productId) {
        const product = await database.Products.findByPk(dto.productId);

        if (!product) {
          throw new Error("Product not found.");
        }
      }

      await database.ProductImages.create({
        id: uuidv4(),
        imageUrl: dto.imageUrl,
        productId: dto.productId,
      });
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  /**
   * used to temporarily store the image URL
   */
  async getById(id) {
    const productImage = await database.ProductImages.findOne({
      where: {
        id: id,
      },
    });

    if (!productImage) {
      throw new Error("Product image not found.");
    }

    return productImage;
  }

  async deleteById(id) {
    const productImage = await database.ProductImages.findOne({
      where: {
        id: id,
      },
    });

    if (!productImage) {
      throw new Error("Product image not found.");
    }

    try {
      await database.ProductImages.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }
}

module.exports = ProductImageService;
