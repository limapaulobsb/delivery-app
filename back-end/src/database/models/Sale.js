module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      customerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(11, 2),
      deliveryAddress: DataTypes.STRING(100),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      tableName: 'Sales',
      timestamps: false,
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'customer', foreignKey: 'customer_id' });
    Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id' });
  };

  return Sale;
};

