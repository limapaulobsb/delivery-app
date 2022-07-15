module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'SalesProducts',
      timestamps: false,
      underscored: true,
    }
  );

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId' });

    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'saleId',
      through: SaleProduct,
    });
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'productId',
      through: SaleProduct,
    });
  };

  return SaleProduct;
};
