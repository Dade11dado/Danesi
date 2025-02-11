const User = require("../models/userModel")
const authUtil = require("../util/authentication")
const flash = require("../util/session-flash")

async function postSignin  (req,res){
    const user = new User(req.body.username,req.body.password)
    const existingUser = await user.getUserWithSameEmail()
    console.log(existingUser)
    if(!existingUser){
        flash.flashDataToSession(req,{
            errorMessage:"Username non corretto, riprova"
        },()=>{res.redirect("/")})
        return 
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)

    if(!passwordIsCorrect){
        flash.flashDataToSession(req,{
            errorMessage:"Password errata, riprova",
            username:req.body.username
        },()=>{res.redirect("/")})
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