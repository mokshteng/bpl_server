const app = require('express')();
const authRoute = require('./auth')
const matchRoute = require('./match')
const resultRoute = require('./result')

app.use("/",authRoute)
app.use("/",matchRoute)
app.use("/",resultRoute)

module.exports = app