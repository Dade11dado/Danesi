const User = require("../models/userModel")
const authUtil = require("../util/authentication")

async function postSignin  (req,res){
    const user = new User(req.body.username,req.body.password)
    const existingUser = await user.getUserWithSameEmail()
    console.log(existingUser)
    if(!existingUser){
        console.log("no user")
        return 
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)

    if(!passwordIsCorrect){
        console.log("no password")
        return
    }
    authUtil.createUserSession(req,existingUser, function(){
        res.redirect("/home")
    })



}

async function postSignup(req,res,next){
    const user = new User(
        username= req.body.username,
        password= req.body.password
    )

    await user.signup()
    res.redirect("/")
}

module.exports = {
    postSignin,
    postSignup
}