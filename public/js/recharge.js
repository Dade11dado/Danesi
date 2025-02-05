const findBtn = document.getElementById("searchCard")
const inputNumber = document.getElementById("inputNumber")
const cardNUmber = document.getElementById("cardNumber")
const importo = document.getElementById("importo")
const cifra = document.getElementById("cifra")
const cifraBtn = document.getElementById("cifraBtn")
const typeCard = document.getElementById("typeCard")
const spinner = document.getElementById("spinner")
const labelCifra = document.getElementById("labelCifra")
const labelRicarica = document.getElementById("labelRicarica")
async function getCard(){
    spinner.style.display = "block"
    let response
    response = await fetch("http://localhost:3000/card/find",{
        method:"POST",
        body:new URLSearchParams({cardId:inputNumber.value})
       
    })
   
    const obj = await response.json()
    spinner.style.display = "none"
    cardNUmber.style.display = "block"
    importo.style.display = "block"
    cifra.style.display = "block"
    cifraBtn.style.display = "block"
    labelCifra.style.display = "block"
    labelRicarica.style.display ="none"
    inputNumber.style.display ="none"
    findBtn.style.display ="none"
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
    cifra.value = 0
    getCard()
}