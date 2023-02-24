const express = require("express");
const route = express.Router();
const resultController  = require('../controllers/resultContoller')

route.post('/createresult',resultController.createResultInfo)

module.exports =  route;
 