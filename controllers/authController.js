const User = require("../models/userModel")

async function postSignin  (req,res,next){
        const check = await User.signin(username=req.body.username,password=req.body.password)
        console.log(req.body.password)
        check?res.send("ok"):res.send("no")
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