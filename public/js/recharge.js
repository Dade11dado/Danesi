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
const btnNavCarica = document.getElementById("btnNavCarica")
const btnNavScarica = document.getElementById("btnNavScrica")
const btnNavStorico  =document.getElementById("btnNavStorico")
const body  = document.getElementById("body")
const history  = document.getElementById("history")

let totalCard;
var cardId;

btnNavCarica.addEventListener("click",()=>{
    btnNavCarica.style.backgroundColor = "rgb(104, 158, 240)"
    btnNavScarica.style.backgroundColor = "rgb(188, 209, 240)"
    btnNavStorico.style.backgroundColor = "rgb(188, 209, 240)"
    typeCard.value = "plus"
    body.style.display = "flex"
    history.style.display = "none"
    clearTable()
    resetInput()
})

btnNavScarica.addEventListener("click",()=>{
    btnNavCarica.style.backgroundColor = "rgb(188, 209, 240)"
    btnNavScarica.style.backgroundColor = "rgb(104, 158, 240)"
    btnNavStorico.style.backgroundColor = "rgb(188, 209, 240)"
    typeCard.value = "minus"
    body.style.display = "flex"
    history.style.display = "none"
    clearTable()
    resetInput()
   
})

btnNavStorico.addEventListener("click",()=>{
    btnNavCarica.style.backgroundColor = "rgb(188, 209, 240)"
    btnNavScarica.style.backgroundColor = "rgb(188, 209, 240)"
    btnNavStorico.style.backgroundColor = "rgb(104, 158, 240)"
    body.style.display = "none"
    history.style.display = "block"
    fullTable()
    resetInput()

})

async function getCard(){
    cardId=inputNumber.value
    spinner.style.display = "block"
    let obj =  await getInfo()
    if(obj.card == "Card not found"){
        const answerToConfrim = window.confirm("Carta non presente, vuoi aggiungerla al database?")
       if(answerToConfrim){
        postCard()
        let obj1 = await getInfo()
        feedDiv(obj1)
       }else{
        resetInput()
       }
    }else{
        obj = await getInfo()
        feedDiv(obj)
    }
   


   
}

function feedDiv(obj){
    totalCard = obj.total
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
    if(typeCard.value != "plus"){
        cifra.setAttribute("max",totalCard)
    }
}

function resetInput(){
    findBtn.style.display = "block"
    inputNumber.style.display = "block"
labelRicarica.style.display = "flex"
cardNUmber.style.display="none"
importo.style.display="none"
 cifra.style.display="none"
 typeCard.style.display="none"
 spinner.style.display="none"
 labelCifra.style.display="none"
 cifraBtn.style.display = "none"
 cifra.value = ""

}

async function postCard(){
    await fetch(`https://danesi.onrender.com/card/insert`,{
        method:"POST",
        body: new URLSearchParams({cardId:inputNumber.value})
    })
}

async function getInfo(){
    let response
    response = await fetch(`https://danesi.onrender.com/card/find`,{
        method:"POST",
        body:new URLSearchParams({cardId:cardId})
    })
    const obj = await response.json()
    return obj
}

async function chargeCard(){
    let total = cifra.value
    let type = typeCard.value
    let cardId = inputNumber.value
    const totalCard = +importo.innerHTML
    if(type === "minus" && total>totalCard){
        alert("Non puoi sottrarre una cifra maggiore della disponibilità")
        resetInput()
        return
    }
    let response
    response = await fetch(`https://danesi.onrender.com/card/recharge`,
        {method:"POST",
            body:new URLSearchParams({typeCard:type,cardId:cardId,total:total})
        }
    )
    cifra.value = 0
    let condition = type=="plus"?"caricata di":"utilizzata per"
    alert(`Carta ${inputNumber.value} ${condition} ${total} euro` )
    getCard()
    resetInput()
}
