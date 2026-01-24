const dbQueries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

exports.itemDelete = async (req, res) => {
  await dbQueries.deleteByItemID(Number(req.params.itemID));
  res.end();
};

const validateItem = [
  body("item")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Item name must only contain letters")
    .isLength({ min: 1, max: 100 })
    .withMessage("Item name length must be between 1-100 characters"),
  body("quantity")
    .isInt({ min: 0, max: 32767 })
    .withMessage("Quantity must be an integer between 0 and 32767"),
  body("category").notEmpty(),
];

exports.postItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { item, quantity, category } = matchedData(req);
   
    const result = await dbQueries.addItem(category, item, quantity);
    res.status(200).json(result);
  },
];

exports.incrementItemQuantity = async (req, res) => {
  const query = await dbQueries.incrementItem(req.params.itemID);
  
  res.end();
};

exports.decrementItemQuantity = async (req, res) => {
  const query = await dbQueries.decrementItem(req.params.itemID);
  res.end();
};
