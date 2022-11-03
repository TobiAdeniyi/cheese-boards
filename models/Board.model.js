/**
 * We create a Board model with these definitions:
 *
 * Board
 * - type string
 * - description string
 * - rating number
 *
 */

const { DataTypes, Model } = require('sequelize');
const db = require('../db/db');

class Board extends Model { };

Board.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isAlphanumeric: true
      }
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
        isNumeric: true,
      }
    }
  },
  { sequelize: db }
);

module.exports = Board;
