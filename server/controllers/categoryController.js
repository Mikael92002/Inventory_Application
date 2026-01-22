const dbQueries = require("../db/queries");

exports.categoryPost = async (req, res) => {
    const categoryName = req.body.categoryName;
  const rows = await dbQueries.addCategory(categoryName);
  console.log(rows[0]);
  res.send(rows[0]);
};

exports.categoryDelete = async (req, res) => {
  await dbQueries.deleteByCategory(req.params.categoryName);
  res.end();
};
