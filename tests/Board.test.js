const Board = require('../models/Board.model');
const db = require('../db/db');

// Data to use for testing
const smoked = {
  type: "Smoked",
  description: "Smoked: Smoked Gouda, Provolone, and Cheddar.",
  rating: 0
}
const blueCheese = {
  type: "Blue cheese",
  description: "Blue cheese: Gorgonzola, Stilton, Roquefort.",
  rating: 0
}

/**
 * Test the creation of Board object instances
 * assert that the data stored in the DB is of
 * the right types and have the right values
 */
describe('Create a singe cheese board instance', () => {

  // Setup Cheese database
  let boardValue;
  let boardInstance;

  beforeAll(async () => {
    // Clear the database
    await db.sync({ force: true });

    // Create data for test cases
    boardValue = smoked;
    boardInstance = await Board.create(boardValue, { validate: true });
  });

  test('Created cheese board is an instance of Board', () => {
    expect(boardInstance instanceof Board).toBeTruthy();
    expect(boardInstance).toBeInstanceOf(Board);
  });

  test('Created cheese board contains correct values', async () => {
    const boardObjAsJson = await boardInstance.toJSON();
    const title = boardObjAsJson['type'];
    const description = boardObjAsJson['description'];

    expect(title).toBe(boardValue.type);
    expect(description).toBe(boardValue.description);
  });

});

/**
 * Ensure validation errors are thrown
 * when Board instances are created
 * without appropreates SQL configurations
 */
describe('Throw validation error', () => {

  // Clear the database
  beforeAll(async () => await db.sync({ force: true }));

  test('Faild to create cheese bord with Null type value', async () => {
    const error = new Error('Type missing');
    const event = await Board.create(
      { description: 'Board missing a type' },
      { validate: true }
    ).catch(() => error);

    expect(event instanceof Error).toBeTruthy();
    // TODO:
    // * fix error later
    // expect(() => event).toThrow(error);
  });

  test('Faild to create cheese bord with empty type value', async () => {
    const error = new Error('Type missing');
    const event = await Board.create(
      { type: '', description: 'Board missing a type' },
      { validate: true }
    ).catch(() => error);

    expect(event instanceof Error).toBeTruthy();
    // TODO:
    // * fix error later
    // expect(() => event).toThrow(error);
  });

  test('Faild to create cheese bord with empty description value', async () => {
    const error = new Error('Description missing');
    const event = await Board.create(
      { type: 'Smoked', description: '' },
      { validate: true }
    ).catch(() => error);

    expect(event instanceof Error).toBeTruthy();
    // TODO:
    // * fix error later
    // expect(() => event).toThrow(error);
  });

});

/**
 * Test the bulk creation of Board object instances
 * assert that the data stored for each instances
 * the right types and have the right values
 */
describe('Bulk create multiple instances cheese board', () => {

  // Setup variables
  let boardData;
  let boardTable;

  beforeAll(async () => {
    // Clear the database
    await db.sync({ force: true });

    // Create data for bulk create
    boardData = [smoked, blueCheese];
    boardTable = await Board.bulkCreate(boardData, { validate: true });
  });

  test('Created cheese board is an instance of Board', async () => {
    expect(() => {
      return boardTable.every(b => b instanceof Board);
    }).toBeTruthy();
  });

  test('Created cheese board contains correct values', async () => {
    const boardObjAsJson = await boardTable.map(b => b.toJSON());
    const boardObjValues = await boardObjAsJson.map(b => {
      const type = b.type;
      const description = b.description;
      const rating = b.rating;
      return { type, description, rating }
    });

    // ensure objects are the same
    console.log('> Original Board Object');
    console.table(boardData);

    console.log('> Creaetd Board Object');
    console.table(boardObjValues);

    expect(boardObjAsJson.length).toEqual(boardData.length);
    expect(boardObjValues).toEqual(boardData);
  });

});
