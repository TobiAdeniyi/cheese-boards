const User = require('../models/User.model');
const db = require('../db/db');

// jest.setTimeout(50_000);

const usersData = [
  {
    name: 'Bobby Robort',
    email: 'boBBR@google.com'
  },
  {
    name: 'John Da Batptis',
    email: '123_aklsjdf@google.com'
  },
  {
    name: 'Liz Chain-E',
    email: '213@google.com'
  },
  {
    name: 'Beth Crocker',
    email: 'abcs@google.com'
  },
  {
    name: 'Ammie Arnalds',
    email: 'xyz@google.com'
  }
]

describe('Test the User class', () => {

  test('Create a multiple users', async () => {
    await db.sync({ force: true });

    const users = await User.bulkCreate(usersData);
    const usersAsJSON = users.map(usr => {
      return { name: usr.name, email: usr.email };
    });

    console.table(usersAsJSON);
    console.table(usersData);
    expect(usersAsJSON).toEqual(usersData);
  });

});
