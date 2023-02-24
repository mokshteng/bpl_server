const express = require("express");
const route = express.Router();
const matchController = require("../controllers/matchController");

route.get("/getmatchinfo", matchController.getMatchInfo);

module.exports =  route;
 