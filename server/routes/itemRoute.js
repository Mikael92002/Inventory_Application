const Router = require("express");
const controller = require("../controllers/itemController");

const itemRoute = Router();

itemRoute.delete("/:itemID", controller.itemDelete);

module.exports = itemRoute;