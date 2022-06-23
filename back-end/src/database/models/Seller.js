module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define(
    'Seller',
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING(50),
      category: DataTypes.STRING(20),
      imageUrl: DataTypes.STRING,
    },
    {
      tableName: 'Sellers',
      timestamps: false,
      underscored: true,
    }
  );

  Seller.associate = (models) => {
    Seller.belongsTo(models.User, { foreignKey: 'userId' });
    Seller.hasMany(models.Product, { foreignKey: 'sellerId' });
    Seller.hasMany(models.Sale, { foreignKey: 'sellerId' });
  };

  return Seller;
};
