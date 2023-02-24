const express = require("express");
const route = express.Router();
const predictionController = require('../controllers/predictionController');
const { verifyJWTToken } = require("../middlewares/jwtAuthenticator");

route.post("/createprediction", verifyJWTToken, predictionController.createPredictionInfo);

module.exports =  route;
 