module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    {
      productId: DataTypes.INTEGER,
      saleId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'SalesProducts',
      timestamps: false,
      underscored: true,
    }
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      foreignKey: 'sale_id',
      through: SaleProduct,
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      foreignKey: 'product_id',
      through: SaleProduct,
    });
  };

  return SaleProduct;
};
