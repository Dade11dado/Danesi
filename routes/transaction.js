const express = require("express")
const transactionController = require("../controllers/transactionController")

const route = express.Router()

route.post("/insertOne",transactionController.postTransaction)

route.get("/all",transactionController.getTransactions)

route.get("/findBy/",transactionController.findByParams)


module.exports = route