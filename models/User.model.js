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
      unique: true,
      validate: {
        isInt: true,
        notNull: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[\w\s]+/i,
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    }
  },
  { sequelize: db }
);

module.exports = User;
