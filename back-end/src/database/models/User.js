module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      tableName: 'Users',
      timestamps: false,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Sale, { as: 'customer', foreignKey: 'customer_id' });
    User.hasMany(models.Sale, { as: 'seller', foreignKey: 'seller_id' });
  };

  return User;
};
