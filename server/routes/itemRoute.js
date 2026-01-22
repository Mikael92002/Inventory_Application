const Router = require("express");
const controller = require("../controllers/itemController");

const itemRoute = Router();

itemRoute.delete("/:itemID", controller.itemDelete);
itemRoute.post("/", controller.postItem);

module.exports = itemRoute;