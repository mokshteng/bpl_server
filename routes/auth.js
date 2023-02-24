const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth");

route.post("/register", authController.registration);
route.post("/login", authController.login);

module.exports =  route;
 