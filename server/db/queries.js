const pool = require("./pool");

exports.getAllRows = async () => {
  const { rows } = await pool.query("SELECT * FROM inventory ORDER BY item ASC;");
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

exports.addItem = async (category, itemName, quantity, imageURL) => {
  const { rows } = await pool.query(
    `INSERT INTO inventory(category, item, price, imageURL, quantity)
  VALUES($1, $2, 1, '', $3) RETURNING *`,
    [category, itemName, quantity],
  );
  return rows;
};

exports.incrementItem = async(id) =>{
  const {rows} = await pool.query(`UPDATE inventory SET quantity = quantity + 1 WHERE id = $1`, [id]);
  return rows;
}

exports.decrementItem = async(id) =>{
  const {rows} = await pool.query(`UPDATE inventory SET quantity = quantity - 1 WHERE id = $1`, [id]);
  return rows;
}