// models/Task.js
import { DataTypes } from '@sequelize/core';
import db from '../config/sequelizeConfig.js';
import users from './Users.js'; // Import User model for association

// Define the Task model
const Task = db.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: users, // Reference the User model
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

users.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(users, { foreignKey: 'userId' });


module.exports = Task;
