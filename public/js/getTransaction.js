const table = document.getElementById("historyTable")
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"2-digit" };

async function fullTable(){
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

    const response = await fetch(`https://danesi.onrender.com/transaction/all`)
    const obj = await response.json()
    for(const ele of obj){
        let typeCon = ele.type == "minus" ? "Utilizzo" : "Ricarica"
        let newRow = document.createElement("tr")
        newRow.innerHTML = `
        <td>${ele.cardNumber}</td>
        <td>${typeCon}</td>
        <td>${ele.amount}</td>
        <td>${new Date(ele.date).toLocaleDateString("it-IT", options)}</td>
        <td>${ele.location}</td>
        `
        table.appendChild(newRow)
    }
}

function clearTable(){
    table.innerHTML = ""
}