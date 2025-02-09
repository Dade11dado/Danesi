const Transaction = require("../models/transactionModel")

async function postTransaction(req,res){
    console.log(req.body.farmacy)
    const trans = new Transaction(
        cardNumber= req.body.cardId,
        type=req.body.typeCard,
        amount=req.body.cifra,
        location=req.body.farmacy
    )

   await trans.insertTransaction()
   res.send("ok")
}

async function getTransactions(req,res){
    const response = await Transaction.getAllTransaction()
    res.json(response) 
}

async function findByParams(req,res){
    const number = req.query.cardNumber
    const dateTo = req.query.dateTo
    const dateFrom = req.query.dateFrom
    const result = await  Transaction.getQueryTransaction(number,dateTo,dateFrom)
    res.json(result)
}


module.exports = {
    postTransaction,
    getTransactions,
    findByParams
}