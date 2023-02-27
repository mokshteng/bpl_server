const express = require("express");
const route = express.Router();
const matchController = require("../controllers/matchController");
const {verifyJWTToken} = require("../middlewares/jwtAuthenticator")

route.get("/getmatchinfo", matchController.getMatchInfo);

module.exports =  route;
 