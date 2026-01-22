const dbQueries = require("../db/queries");

exports.categoryDelete = async(req, res) =>{
    console.log(req.params.categoryName);
    dbQueries.deleteByCategory(req.params.categoryName);
    res.end();
}