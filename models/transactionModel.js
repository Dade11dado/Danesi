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
        if (!dateTo){
            dateTo = new Date()
        }

        if(!dateFrom){
            dateFrom = new Date("2025-01-01")
        }

        if(number){
            return db.getDb().collection("transaction").find({
                $and:[{date: {$gte: new Date(`${dateFrom != null ? dateFrom : ""}`)}},
                    {date: {$lte: new Date(`${dateTo != null ? dateTo : ""}`)}},
                    {cardNumber: number != null ? number : ""}]
            }).toArray()
        }else{
            return db.getDb().collection("transaction").find({
                $and:[{date: {$gte: new Date(`${dateFrom != null ? dateFrom : ""}`)}},
                    {date: {$lte: new Date(`${dateTo != null ? dateTo : ""}`)}}]
            }).toArray()
        }
            
           
    }
}

module.exports = Transaction