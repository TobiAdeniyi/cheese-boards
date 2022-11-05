/**
 * We import our models to have one
 * single entry point for accessing modles.
 *
 */

const User = require("./User.model");
const Board = require("./Board.model");
const Cheese = require("./Cheese.model");

/**
 * User and Board models have a One-to-Many relationship
 * * A single User may have multiple cheese Boards
 * * Multiple cheese Boards may be owned by a single User
 */
User.hasMany(Cheese);
Cheese.belongsTo(User)


/**
 * Board and Cheese models have a Many-to-Many relationship
 * * A cheese Board may have many (types of) Cheese on it
 * * A (type of) Cheese might be a part of various cheese Boards
 *
 * Note: the Board-Cheese many-to-many relationship requires
 * an additional JOIN table which we will name "Board_Cheese"
 */
Board.belongsToMany(Cheese, { through: 'Board_Cheese' });
Cheese.belongsToMany(Board, { through: 'Board_Cheese' });


module.exports = { User, Board, Cheese };
