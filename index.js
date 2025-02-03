const path = require("path")
const express = require("express")
const db = require("./data/database")
const app = express()
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")
const errorhandler = require("./middlewares/error-handler")
const checkAuth = require("./middlewares/check-auth")
const createSessionConfig = require("./config/session")
const expressSession = require("express-session")


//all use related to initialization
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//all use 
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
const sessionConfig = createSessionConfig()
app.use(expressSession(sessionConfig))

app.use(checkAuth)
//routing
app.use("/auth",authRoutes)


app.get("/",(req,res)=>{
    res.render("singin.ejs")
})

app.get("/home",(req,res)=>{
    res.render("home.ejs")
})

app.use(errorhandler)


db.connectToDatabase()
.then(()=>{console.log("Connected to db")})
.catch((e)=>{console.log("failed: "+ e)})

app.listen(3000, ()=>{
    console.log("Connected to server")
})

