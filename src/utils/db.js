const Sequelize = require('sequelize');
const { db } = require('@config');
const { isEmpty } = require('lodash');

let sequelize;

const createConnection = () => {
  const sequelizeOptions = {
    logging: db.logging ? console.log : null,
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      dialectOptions: { ssl: true }
    }
  };

  sequelize = new Sequelize(encodeURI(db.uri), sequelizeOptions);
  return sequelize;
};

const getDbConnection = () => {
  if (isEmpty(sequelize)) {
    sequelize = createConnection();
  }
  return sequelize;
};

module.exports = {
  db: getDbConnection()
};
