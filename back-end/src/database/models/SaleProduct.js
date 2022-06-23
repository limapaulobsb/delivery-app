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
    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      through: SaleProduct,
    });
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      through: SaleProduct,
    });
  };

  return SaleProduct;
};
