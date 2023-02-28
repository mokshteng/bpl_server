const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth");
const { verifyJWTToken } = require("../middlewares/jwtAuthenticator");

route.post("/register", authController.registration);
route.post("/login", authController.login);
route.post("/isauth",verifyJWTToken)

module.exports =  route;
 