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
    User.hasMany(models.Seller, { as: 'user', foreignKey: 'user_id' });
    User.hasMany(models.Sale, { as: 'user', foreignKey: 'user_id' });
  };

  return User;
};
