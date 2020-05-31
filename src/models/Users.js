const Sequelize = require('sequelize');
const { db: sequelize } = require('@utils/db');

module.exports = () => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'User'
      },
      created_at: { type: Sequelize.DATE, field: 'created_at' },
      deleted_at: { type: Sequelize.DATE, field: 'deleted_at' },
      updated_at: { type: Sequelize.DATE, field: 'updated_at' },
    }
  );
  return {
    Users
  };
};
