"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductImages.belongsTo(models.Products, {
        as: "product",
        foreignKey: "productId",
      });
    }
  }
  ProductImages.init(
    {
      imageUrl: DataTypes.TEXT,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ProductImages",
    }
  );
  return ProductImages;
};
