module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      sellerId: DataTypes.INTEGER,
      name: DataTypes.STRING(50),
      price: DataTypes.DECIMAL(8, 2),
      imageUrl: DataTypes.STRING,
    },
    {
      tableName: 'Products',
      timestamps: false,
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Seller, { foreignKey: 'sellerId', as: 'seller' });
    Product.hasMany(models.SaleProduct, { foreignKey: 'productId' });
  };

  return Product;
};
