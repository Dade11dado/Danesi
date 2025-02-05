const Card = require("../models/cardModel")

async function findCard(req,res){
    console.log(req.body.cardId)
    const newCard = new Card(cardNumber = req.body.cardId, totale = 0)
    const foundCard = await newCard.getCard()
    if(!foundCard){
        postCard(req,res)
        
    }
    return res.json(foundCard)
}

async function postCard(req,res){
    let total
    !req.body.total?total=0:total=req.body.total
    const newCard = new Card(
        cardNumber=req.body.cardId,
        total=total)
    await newCard.insertCard()
}

async function modifyTotal(req,res){
    const typeCard = req.body.typeCard
    const newCard = new Card(cardNumber=req.body.cardId)
    const card = await newCard.getCard()
    if(!card){
        return res.send("no card found")
    }
    let total = +card.total
    let newTotal = +req.body.total

    if(typeCard != "plus"){
        if(newTotal > total){
            return res.send("non puoi farlo")
        }else{
            total-=newTotal
            const resolution = await newCard.rechargeCard(total)
            return res.json(resolution)
        }
    }else{
        total+=newTotal
        const resolution = await newCard.rechargeCard(total)
        return res.json(resolution)
    }
   
  
}


module.exports = {
    findCard,
    postCard,
    modifyTotal
}