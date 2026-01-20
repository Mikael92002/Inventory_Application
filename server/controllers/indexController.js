const dbQueries = require("../db/queries");

exports.indexGet = async(req, res) =>{
    // get all items from SQL database:
    const rows = await dbQueries.getAllRows();
    res.send(rows);
}