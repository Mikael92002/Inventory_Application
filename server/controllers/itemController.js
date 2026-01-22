const dbQueries = require("../db/queries");

exports.itemDelete = async (req, res) => {
  dbQueries.deleteByItemID(Number(req.params.itemID));
  res.end();
};
