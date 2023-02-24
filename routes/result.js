const express = require("express");
const route = express.Router();
const resultController  = require('../controllers/resultContoller')

route.post('/createresult',resultController.createResultInfo)
route.get('/getscore',resultController.getLeaderBoard)

module.exports =  route;
 