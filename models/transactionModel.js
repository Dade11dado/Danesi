const db = require("../data/database")

class Transaction{

    constructor(cardNumber,type,amount,location){
        this.cardNumber = cardNumber
        this.type = type
        this.amount = amount
        this.date = new Date()
        this.location= location
    }

    async insertTransaction(){
        await db.getDb().collection("transaction").insertOne({
            cardNumber: this.cardNumber,
            type:this.type,
            amount:this.amount,
            date:this.date,
            location:this.location
        })
    }

    static getAllTransaction(){
        return db.getDb().collection("transaction").find().toArray()
    }

    static async getQueryTransaction(number,dateTo,dateFrom){
        if (number && dateTo && dateFrom){
            return db.getDb().collection("transaction").find({
                cardNumber: number,
                date:{$gte: new Date(`${dateFrom}`)}
            }).toArray()
        }
    }
}

module.exports = Transaction