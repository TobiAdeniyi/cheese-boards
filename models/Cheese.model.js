/**
 * We create a Cheese model with these definitions:
 *
 * Cheese
 * - title string
 * - description string
 *
 */

const { DataTypes, Model } = require('sequelize');
const db = require('../db/db');

class Cheese extends Model { };

Cheese.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[\w\s]+/i,
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /[\w\s]+/i
      }
    }
  },
  { sequelize: db }
);

module.exports = Cheese;
