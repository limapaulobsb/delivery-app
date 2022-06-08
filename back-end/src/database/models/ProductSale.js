module.exports = (sequelize, DataTypes) => {
  const ProductSale = sequelize.define(
    'ProductSale',
    {
      productId: DataTypes.INTEGER,
      saleId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'ProductsSales',
      timestamps: false,
      underscored: true,
    }
  );

  ProductSale.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      foreignKey: 'product_id',
      through: ProductSale,
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      foreignKey: 'sale_id',
      through: ProductSale,
    });
  };

  return ProductSale;
};
