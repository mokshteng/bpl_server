const app = require('express')();
const authRoute = require('./auth')
const matchRoute = require('./match')
const resultRoute = require('./result')
const predictionRoute = require('./prediction')

app.use("/",authRoute)
app.use("/",matchRoute)
app.use("/",resultRoute)
app.use("/",predictionRoute)

module.exports = app