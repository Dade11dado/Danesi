const path = require("path")
const app = require("express")()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/",(req,res)=>{
    res.render("singin.ejs")
})

app.listen(3000, ()=>{
    console.log("Connected to server")
})

