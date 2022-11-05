const Cheese = require('../models/Cheese.model');
const db = require('../db/db');


// Data to use for test cases
const mozzarella = {
  title: "Mozzarella",
  description: "Similar to fresh..." // mozzarella, this mozzarella is pulled and kneaded into strands, which contributes to its stretch ability. It melts well and is commonly used on pizza. Check out our classic Cheese Lovers Pizza Squares for a tasty mozzarella dish."
};
const halloumi = {
  title: "Halloumi",
  description: "Halloumi is known..." // for its high melting point so it's often fried or grilled. While often made from goat or sheep milk, cow's milk also may be used. The texture is similar to mozzarella, while its taste is strong and salty. Once cooked, it becomes less salty and creamier."
};
const gorgonzola = {
  title: "Gorgonzola",
  description: "Gorgonzola is one..." // of the world's oldest types of blue cheese. It has a crumbly and soft texture, and its taste can range from creamy to sharp."
};
const gruyere = {
  title: "Gruyere",
  description: "This slightly grainy..." // cheese is known for its fruity, earthy and nutty flavors. It melts well and adds a savory flavor without overpowering others. It's commonly used on sandwiches, in hot meals, over French onion soup and more."
};


/**
 * Test the creation of Cheese object instances
 * assert that the data stored in the DB is of
 * the right types and have the right values
 */
describe('Create a single cheese instance', () => {

  // Setup Cheese database
  let cheeseValue;
  let cheeseInstance;

  beforeAll(async () => {
    // Clear the database
    // await db.sync({ force: true });

    // Create data for test cases
    cheeseValue = mozzarella;
    cheeseInstance = await Cheese.create(cheeseValue, { validate: true });
  });

  test('Created cheese is an instance of Cheese Model', () => {
    expect(cheeseInstance instanceof Cheese).toBeTruthy();
    expect(cheeseInstance).toBeInstanceOf(Cheese);
  });

  test('Created cheese contains correct values', async () => {
    const cheeseObjAsJson = await cheeseInstance.toJSON();
    const title = cheeseObjAsJson['title'];
    const description = cheeseObjAsJson['description'];

    expect(title).toBe(cheeseValue.title);
    expect(description).toBe(cheeseValue.description);
  });

});

/**
 * Ensure validation errors are thrown
 * when Cheese instances are created
 * without appropreates SQL configurations
 */
describe('Throw validation errors', () => {

  // Clear the database
  // beforeAll(async () => await db.sync({ force: true }));

  test('Fail to create cheese with Null title', async () => {
    const error = new Error('Title missing');
    const event = await Cheese.create(
      { description: 'Cheese missing a title' },
      { validate: true }
    ).catch(() => error);

    expect(event instanceof Error).toBeTruthy();
    // TODO:
    // * fix error later
    // expect(() => event).toThrow(error);
  });

  test('Fail to create cheese with Empty title', async () => {
    const error = new Error('Title set to empty string');
    const event = await Cheese.create(
      {
        title: '',
        description: 'Title set to ""'
      },
      { validate: true }
    ).catch(() => error);

    expect(event instanceof Error).toBeTruthy();
    // TODO:
    // * fix error later
    // expect(event).toThrow(error);
  });

})

/**
 * Test the bulk creation of Cheese object instances
 * assert that the data stored for each instances
 * the right types and have the right values
 */
describe('Bulk create multiple cheese instances', () => {

  // Setup variables
  let cheeseData;
  let cheeseTable;

  beforeAll(async () => {
    // Clear the database
    // await db.sync({ force: true });

    // Create data for bulk create
    cheeseData = [gruyere, gorgonzola, halloumi, mozzarella];
    cheeseTable = await Cheese.bulkCreate(cheeseData, { validate: true });
  });

  test('Cheese objects are instances of Cheese Model', async () => {
    expect(() => cheeseTable.every(c => c instanceof Cheese)).toBeTruthy();
  });

  test('Cheese objects contain correct values', async () => {
    const cheeseObjAsJson = await cheeseTable.map(c => c.toJSON());
    const cheeseObjValues = await cheeseObjAsJson.map(c => {
      const title = c.title;
      const description = c.description;
      return { title, description }
    });

    // ensure objects are the same
    console.log('> Original Cheese Object');
    console.table(cheeseData);

    console.log('> Creaetd Cheese Object');
    console.table(cheeseObjValues);

    expect(cheeseObjAsJson.length).toEqual(cheeseData.length);
    expect(cheeseObjValues).toEqual(cheeseData);
  });

});
