module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define(
    'Seller',
    {
      userId: DataTypes.INTEGER,
      category: DataTypes.STRING(20),
      name: DataTypes.STRING(50),
      imageUrl: DataTypes.STRING,
    },
    {
      tableName: 'Sellers',
      timestamps: false,
      underscored: true,
    }
  );

  Seller.associate = (models) => {
    Seller.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Seller.hasMany(models.Sale);
  };

  return Seller;
};
