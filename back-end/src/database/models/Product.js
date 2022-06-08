module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(5, 2),
      imageUrl: DataTypes.STRING(200),
    },
    {
      tableName: 'Products',
      timestamps: false,
      underscored: true,
    }
  );

  return Product;
};
