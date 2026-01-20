const {Router} = require("express");
const controller = require("../controllers/indexController");

const indexRoute = Router();

indexRoute.get("/", controller.indexGet);

module.exports = indexRoute;