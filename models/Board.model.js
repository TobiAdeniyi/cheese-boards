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
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0
    }
  },
  { sequelize: db }
);

module.exports = Board;
