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

     getUserWithSameEmail(){
        return db.getDb().collection("users").findOne({
            username:this.username
        })
     }

     hasMatchingPassword(hashedPassword){
    return bcrypt.compare(this.password,hashedPassword)
     }
}

module.exports = User