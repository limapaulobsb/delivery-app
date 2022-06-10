module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
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
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Sale.belongsTo(models.Seller, { as: 'seller', foreignKey: 'seller_id' });
  };

  return Sale;
};
