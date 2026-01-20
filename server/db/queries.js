const pool = require("./pool");

exports.getAllRows = async () => {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  return rows;
};
