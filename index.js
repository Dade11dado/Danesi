const path = require("path")
const express = require("express")
const db = require("./data/database")
const app = express()
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")
const cardRoutes = require("./routes/cardRoutes")
const transRoute = require("./routes/transaction")
const errorhandler = require("./middlewares/error-handler")
const checkAuth = require("./middlewares/check-auth")
const createSessionConfig = require("./config/session")
const expressSession = require("express-session")
const flash = require("./util/session-flash")
const secureRoutes = require("./middlewares/secureRoutes")

let PORT = 3000

if (process.env.PORT){
    PORT = process.env.PORT
}

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
app.use("/card",secureRoutes,cardRoutes)
app.use("/transaction",transRoute)


app.get("/",(req,res)=>{
    let sessionData = flash.getSessionData(req)
    if (!sessionData){
        sessionData = {
            username:""
        }
    }
    if(res.locals.isAuth){
res.redirect("/home")
    }else{
        res.render("singin.ejs",{inputData: sessionData})
    }
    
})

app.get("/home",secureRoutes,(req,res)=>{
    res.render("home.ejs")
})

app.use(errorhandler)


db.connectToDatabase()
.then(()=>{console.log("Connected to db")})
.catch((e)=>{console.log("failed: "+ e)})

app.listen(PORT, ()=>{
    console.log("Connected to server")
})

