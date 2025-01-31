const path = require("path")
const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("singin.ejs")
})

app.listen(3000, ()=>{
    console.log("Connected to server")
})

