const Router = require("express");
const controller = require("../controllers/itemController");

const itemRoute = Router();

itemRoute.delete("/:itemID", controller.itemDelete);
itemRoute.post("/", controller.postItem);
itemRoute.put("/decrementItem/:itemID", controller.decrementItemQuantity);
itemRoute.put("/incrementItem/:itemID", controller.incrementItemQuantity);

module.exports = itemRoute;