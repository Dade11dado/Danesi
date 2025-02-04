const db = require("../data/database")

class Card{
    constructor(cardNumber, total){
        this.cardNumber = cardNumber
        this.total = total
    }

    getCard(){
        return db.getDb().collection("cards").findOne({
            cardNumber:this.cardNumber
        })
    }

    async insertCard(){
        await db.getDb().collection("cards").insertOne({
            cardNumber : this.cardNumber,
            total : this.total
        })
    }

    async rechargeCard(total){
        return db.getDb().collection("cards").updateOne({
            cardNumber:this.cardNumber
        },{$set:{total:total}})
    }
}

module.exports = Card