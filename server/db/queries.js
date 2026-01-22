const pool = require("./pool");

exports.getAllRows = async () => {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  return rows;
};

exports.deleteByItemID = async (itemID) => {
  await pool.query("DELETE FROM inventory WHERE id = $1", [itemID]);
};

exports.deleteByCategory = async (categoryName) => {
  await pool.query("DELETE FROM inventory WHERE category = $1", [categoryName]);
};

exports.addCategory = async (categoryName) => {
  const { rows } = await pool.query(
    `INSERT INTO inventory(category, item, price, imageURL, quantity)
    VALUES($1, NULL, NULL, NULL, NULL) RETURNING *`,
    [categoryName],
  );
  return rows;
};

exports.addItem = async (category, itemName, price, imageURL) => {
  const { rows } = await pool.query(
    `INSERT INTO inventory(category, item, price, imageURL, quantity)
  VALUES($1, $2, $3, $4, 1) RETURNING *`,
    [category, itemName, price, imageURL],
  );
  return rows;
};
