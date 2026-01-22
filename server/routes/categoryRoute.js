const Router = require("express");
const controller = require("../controllers/categoryController");

const categoryRoute = Router();

categoryRoute.delete("/:categoryName", controller.categoryDelete);

module.exports = categoryRoute;