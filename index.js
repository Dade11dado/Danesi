const path = require("path")
const express = require("express")
const db = require("./data/database")
const app = express()
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")


//all use related to initialization
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//all use 
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

//routing
app.use("/auth",authRoutes)

app.get("/",async (req,res)=>{
    res.render("singin.ejs")
})


db.connectToDatabase()
.then(()=>{console.log("Connected to db")})
.catch((e)=>{console.log("failed: "+ e)})

app.listen(3000, ()=>{
    console.log("Connected to server")
})

