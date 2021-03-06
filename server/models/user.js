module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      uid: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      access: DataTypes.JSONB,
      irrelevant: DataTypes.BOOLEAN,
    },
    {
      underscored: true,
      tableName: 'users',
    }
  )

  return user
}
