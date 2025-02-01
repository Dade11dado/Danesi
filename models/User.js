const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    password:String
})

const userSchema = mongoose.model("user",UserSchema)
module.exports = userSchema