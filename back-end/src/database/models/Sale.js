module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      sellerId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(11, 2),
      date: DataTypes.DATE,
      deliveryAddress: DataTypes.STRING(100),
      status: DataTypes.STRING(20),
    },
    {
      tableName: 'Sales',
      timestamps: false,
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.Seller, { foreignKey: 'sellerId', as: 'seller' });
    Sale.belongsTo(models.User, { foreignKey: 'userId' });
    Sale.hasMany(models.SaleProduct, { foreignKey: 'saleId', as: 'products' });
  };

  return Sale;
};
