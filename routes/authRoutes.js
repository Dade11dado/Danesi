const express  = require("express")
const {postSignin,postSignup} = require("../controllers/authController")

const router = express.Router()

router.post("/signin",postSignin)

router.post("/signup",postSignup)

module.exports = router