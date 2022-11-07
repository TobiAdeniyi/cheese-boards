const { Board, Cheese, User, UsersBoards, BoardsOwners, BoardsCheeses, CheeseBoards } = require("../models");
const db = require("../db/db");

/**
 * Test to verify that a User ca be loaded with its Boards.
 *
 * Ensure user can be loaded with:
 * + No boards
 * + One board
 * + Multiple boards
 */
describe('User_Board one-to-many relationship', () => {
  let userData;
  let userBoards;

  beforeAll(() => {
    db.sync({ force: true });

    // Define user data
    userData = {
      name: "Bobby Robort",
      email: "boBBR@google.com",
    };
    userBoards = [
      {
        type: 'Aged',
        description: "Aged: Gouda, Sharp Cheddar, Gruyere.",
        rating: 0
      },
      {
        type: "Soft and creamy",
        description: "Soft and creamy: Brie, Camembert, Epoisses, Burrata, Fresh Buffalo Mozzarella.",
        rating: 0
      },
      {
        type: "Crumbly",
        description: "Crumbly: Goat and Feta Cheese.",
        rating: 0
      }
    ];

  });

  test('Create User with no Board', () => {
    const user = User.create(userData, { validate: true });
  });

  test('Create User with one Board', () => {
    userData['userBoards'] = [userBoards[0]];
    const user = User.create(
      userData,
      {
        validate: true,
        include: [
          { association: UsersBoards, as: 'usersBoards' }
        ]
      }
    );
  });

  test('Create User with multiple Board', () => {
    userData['userBoards'] = userBoards;
    const user = User.create(
      userData,
      {
        validate: true,
        include: [
          { association: UsersBoards, as: 'usersBoards' }
        ]
      }
    );
  });
});
