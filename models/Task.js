// models/Task.js
import { DataTypes } from 'sequelize';
import {db} from '../config/sequelizeConfig.js';
import User from './User.js'; // Import User model for association

const Task = db.define('tasks', {
  tid : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncremet: true
  },
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
  uid: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Reference the User model
      key: 'uid',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Task, { foreignKey: 'uid' });
Task.belongsTo(User, { foreignKey: 'uid' });

export default Task;
