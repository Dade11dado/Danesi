const buttonS = document.getElementById("searchHistory")
const number = document.getElementById("historySearch")
const dateFrom = document.getElementById("historyDateStart")
const dateTo = document.getElementById("historyDateEnd")
const fields = document.getElementById("divTable")

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"2-digit" };

buttonS.addEventListener("click", async ()=>{
    spinner.style.display = "block"
    const response = await fetch(` https://danesi.onrender.com/transaction/findBy/?cardNumber=${number.value.trim()}&dateTo=${dateTo.value}&dateFrom=${dateFrom.value}`)
    const obj = await response.json()
    clearTable()
    if(obj.length == 0){
        alert("<h1>non sono state trovate transazioni, prova a modificare i flìiltri di ricerca</h1>")
        return
    }
       spinner.style.display = "none"
        let headerRow = document.createElement("tr")
        headerRow.innerHTML = `
        <tr>
        <th>Numero carta</th>
        <th>Tipo transazione</th>
        <th>Importo</th>
        <th>Data</th>
        <th>Sede</th>
    </tr>
        `
        table.appendChild(headerRow)
        obj.forEach(e => {
            let typeCon = e.type == "minus" ? "Utilizzo" : "Ricarica"
            let headerRow = document.createElement("tr")
        headerRow.innerHTML = `
        <tr>
        <td>${e.cardNumber}</td>
        <td>${typeCon}</td>
        <td>${e.amount}</td>
        <td>${new Date(e.date).toLocaleDateString("it-IT", options)}</td>
        <td>${e.location}</td>
    </tr>
        `
        table.appendChild(headerRow)
        })
    
})