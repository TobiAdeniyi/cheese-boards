/**
 * We create a User model with these definitions:
 *
 * User
 * - name string
 * - email string
 *
 */

const { DataTypes, Model } = require('sequelize');
const db = require('../db/db');

class User extends Model { };

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  { sequelize: db }
);

module.exports = User;
