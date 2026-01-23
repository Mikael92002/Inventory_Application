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
  body("price")
    .isLength({ max: 8 })
    .withMessage("Price must be between 0 and 99999.99")
    .isDecimal({
      min: 0,
      max: 99999.99,
      force_decimal: false,
      decimal_digits: 2,
    })
    .withMessage("Price must be between 0 and 99999.99"),
  body("category").notEmpty(),
  body("imageURL").optional({ values: "falsy" }),
];

exports.postItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    console.log(req.body);
    const { item, price, imageURL, category } = matchedData(req);
    console.log(category);
    const result = await dbQueries.addItem(category, item, price, imageURL);
    res.status(200).json(result);
  },
];
