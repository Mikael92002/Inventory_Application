const pool = require("./pool");

exports.getAllRows = async () => {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  return rows;
};

exports.deleteByItemID = async (itemID) => {
  const result = await pool.query("DELETE FROM inventory WHERE id = $1", [
    itemID,
  ]);
};

exports.deleteByCategory = async (categoryName) => {
  const result = await pool.query("DELETE FROM inventory WHERE category = $1", [
    categoryName,
  ]);
};
