const express = require("express");
const route = express.Router();
const predictionController = require('../controllers/predictionController');
const { verifyJWTToken } = require("../middlewares/jwtAuthenticator");

route.post("/createprediction", verifyJWTToken, predictionController.createPredictionInfo);
route.get("/getpredictions",verifyJWTToken,predictionController.getPredictionByUser)
route.get("/getpredictionbymatch",verifyJWTToken,predictionController.getPredictionByUserAndMatch)

module.exports =  route;
 