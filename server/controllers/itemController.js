const dbQueries = require("../db/queries");

exports.itemDelete = async (req, res) => {
  dbQueries.deleteByItemID(Number(req.params.itemID));
  res.end();
};

exports.postItem = async (req, res) => {
  console.log(req.body);
  const { category, item, price, imageURL } = req.body;
  const result = dbQueries.addItem(category, item, price, imageURL);
  res.redirect("/");
};