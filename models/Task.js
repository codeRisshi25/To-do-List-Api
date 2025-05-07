// models/Task.js
import { DataTypes } from "sequelize";
import { db } from "../config/sequelizeConfig.js";
import User from "./User.js"; // Import User model for association

const Task = db.define("tasks", {
  tid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
      model: User,
      key: "uid",
    },
    onDelete: "CASCADE", // or 'SET NULL' or 'RESTRICT'
    onUpdate: "CASCADE",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Task, { foreignKey: "uid" });
Task.belongsTo(User, { foreignKey: "uid" });

await Task.sync()

export default Task;
