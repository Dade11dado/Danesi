function createUserSession(req,user,action){
    req.session.uid = user._id.toString()
    console.log("USERNAME_ " + user)
    req.session.username = user.username
    req.session.save(action)
}

module.exports = {
    createUserSession
}