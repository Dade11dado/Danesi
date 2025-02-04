const findBtn = document.getElementById("searchCard")
const inputNumber = document.getElementById("inputNumber")
const cardNUmber = document.getElementById("cardNumber")
const importo = document.getElementById("importo")
const cifra = document.getElementById("cifra")
const cifraBtn = document.getElementById("cifraBtn")
const typeCard = document.getElementById("typeCard")

async function getCard(){
    let response
    response = await fetch("http://localhost:3000/card/find",{
        method:"POST",
        body:new URLSearchParams({cardId:inputNumber.value})
       
    })

    const obj = await response.json()
    console.log(obj)
    cardNUmber.innerHTML = obj.cardNumber
    importo.innerHTML = obj.total
}

async function chargeCard(){
    let total = cifra.value
    let type = typeCard.value
    let cardId = inputNumber.value
    console.log(total,typeCard,cardId)
    let response
    response = await fetch("http://localhost:3000/card/recharge",
        {method:"POST",
            body:new URLSearchParams({typeCard:type,cardId:cardId,total:total})
        }
    )

    console.log(await response.json())
}