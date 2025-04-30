const { DataTypes } = require('@sequelize/core');
const {db} = require('../config/sequelizeConfig');

// Define the User model
const users = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = users;
