module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING(50),
      password: DataTypes.STRING(50),
      name: DataTypes.STRING(50),
      role: DataTypes.STRING(10),
    },
    {
      tableName: 'Users',
      timestamps: false,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Seller, { foreignKey: 'userId' });
    User.hasMany(models.Sale, { foreignKey: 'userId' });
  };

  return User;
};
