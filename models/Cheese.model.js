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
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  { sequelize: db }
);

module.exports = Cheese;
