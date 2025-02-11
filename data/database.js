const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient

let database

let mongodburl = "mongodb://localhost:27017"

if(process.env.MONGO_BD_URL){
    mongodburl = process.env.MONGO_BD_URL
}

async function connectToDatabase(){
     const client = await MongoClient.connect(mongodburl)
     database = client.db("Danesi")
}

function getDb(){
    if (!database){
        throw new Error("You must connect first")
    }

    return database
}

module.exports = {
    connectToDatabase,
    getDb
}
