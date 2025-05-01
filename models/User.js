import { DataTypes } from 'sequelize';
import { db } from '../config/sequelizeConfig.js';
import bcrypt from 'bcrypt';

// Define the User model
const User = db.define('users', {
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value,salt);
      this.setDataValue('password',hash);
    }
  },
  logginIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
