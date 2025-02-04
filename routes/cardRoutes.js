const express= require("express")
const cardController = require("../controllers/cardController")

const router = express.Router()

router.post("/find",cardController.findCard)

router.post("/insert", cardController.postCard)

router.post("/recharge",cardController.modifyTotal)

module.exports = router