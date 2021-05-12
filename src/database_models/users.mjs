import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  });

  return User;
};