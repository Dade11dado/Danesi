const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userSchema = require("./models/User")
const bodyParser = require("body-parser")

main().catch(e => {console.log(e)})

async function main () {
    await mongoose.connect("mongodb://127.0.0.1:27017/Danesi")
}
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",async (req,res)=>{
    res.render("singin.ejs")
})

app.post("/signin", async(req,res)=>{
    const {username,password} = req.body
    const result = await userSchema.find({username})
    console.log(result)
})

app.listen(3000, ()=>{
    console.log("Connected to server")
})

