const { User, Cheese, Board } = require("../models");
const db = require("./db");

const seed = async _ => {
  await db.sync({ force: true });

  // Bulk Create Users
  await User.bulkCreate(
    [
      {
        name: "Bobby Robort",
        email: "boBBR@google.com"
      },
      {
        name: "John Da Batptis",
        email: "123_aklsjdf@google.com"
      },
      {
        name: "Liz Chain-E",
        email: "213@google.com"
      },
      {
        name: "Beth Crocker",
        email: "abcs@google.com"
      },
      {
        name: "Ammie Arnalds",
        email: "xyz@google.com"
      }
    ],
    { validate: true }
  );

  // Bulk Create Cheese
  await Cheese.bulkCreate(
    [
      {
        title: "American",
        description: "American is a creamy, smooth cheese made from blending natural cheeses. It comes in several forms including individually wrapped cheese slices, small pre-sliced blocks and large blocks. It melts well."
      },
      {
        title: "Blue Cheese"
      },
      {
        title: "Bocconcini"
      },
      {
        title: "Camembert",
        description: "Fresh Camembert cheese is bland, hard and crumbly, but becomes smoother with a runny interior as it ages. It has a rich, buttery flavor with a rind that's meant to be eaten."
      },
      {
        title: "Cheddar",
        description: "This popular cheese comes in many variations. Its flavor can range from creamy to sharp, and its color can run between a natural white to pumpkin orange. A Cheddar's texture changes as it ages, becoming drier and more crumbly. Learn more about cheddar in our All About Cheddar Cheese article."
      },
      {
        title: "Emmental"
      },
      {
        title: "Feta"
      },
      {
        title: "Farmer's",
        description: "Farmer's cheese is made when cottage cheese is squeezed to remove the extra moisture. It may then be rolled in herbs or smoked meats. Its style varies depending on its maker."
      },
      {
        title: "Gouda",
        description: "A semi-hard to hard cheese with a smooth flavor, Gouda comes in several types, depending on its age. Gouda can be grated, sliced, cubed and melted."
      },
      {
        title: "Sharp Cheddar",
        description: "This popular cheese comes in many variations. Its flavor can range from creamy to sharp, and its color can run between a natural white to pumpkin orange. A Cheddar's texture changes as it ages, becoming drier and more crumbly."
      },
      {
        title: "Gruyere",
        description: "This slightly grainy cheese is known for its fruity, earthy and nutty flavors. It melts well and adds a savory flavor without overpowering others. It's commonly used on sandwiches, in hot meals, over French onion soup and more."
      },
      {
        title: "Gorgonzola",
        description: "Gorgonzola is one of the world's oldest types of blue cheese. It has a crumbly and soft texture, and its taste can range from creamy to sharp."
      },
      {
        title: "Halloumi",
        description: "Halloumi is known for its high melting point so it's often fried or grilled. While often made from goat or sheep milk, cow's milk also may be used. The texture is similar to mozzarella, while its taste is strong and salty. Once cooked, it becomes less salty and creamier."
      },
      {
        title: "Mozzarella",
        description: "Similar to fresh mozzarella, this mozzarella is pulled and kneaded into strands, which contributes to its stretch ability. It melts well and is commonly used on pizza. Check out our classic Cheese Lovers Pizza Squares for a tasty mozzarella dish."
      }
    ],
    { validate: true }
  );

  // Bulk Create Board
  await Board.bulkCreate(
    [
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
      },
      {
        type: "Firm",
        description: "Firm: Parmigiano Reggiano, Manchego, Gouda.",
        rating: 0
      },
      {
        type: "Smoked",
        description: "Smoked: Smoked Gouda, Provolone, and Cheddar.",
        rating: 0
      },
      {
        type: "Blue cheese",
        description: "Blue cheese: Gorgonzola, Stilton, Roquefort.",
        rating: 0
      }
    ],
    { validate: true }
  );
};

seed();
