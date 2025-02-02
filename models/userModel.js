const bcrypt = require("bcryptjs")
const db = require("../data/database")

class User{
    constructor(username,password){
        this.username = username
        this.password = password
    }

    async signup(){
        const hashed = await bcrypt.hash(this.password, 12)
        await db.getDb().collection("users").insertOne({
            username:this.username,
            password:hashed
        })
    }

    static async signin(username, password){
        const result = await db.getDb().collection("users").findOne({
            username
        })
        bcrypt.compare(password,result.password,(err,res)=>{
            if (err){
                console.log(err)
            }else{
                return res
            }
        })
        
    }
}

module.exports = User