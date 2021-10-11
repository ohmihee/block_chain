'use strict';

const fs = require('fs');
const path = require('path');
const { Transaction } = require('sequelize');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); 
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = require('./user')(sequelize,Sequelize)
db.Transaction = require('./transaction')(sequelize,Sequelize)
db.Assets = require('./assets')(sequelize,Sequelize)

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



// User.init(sequelize)
// Transaction.init(sequelize)


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// select * from information_schema.table_constraints where constraint_schema = 'exchange'