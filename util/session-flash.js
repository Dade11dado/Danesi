function flashDataToSession(req, data, action){
    req.session.flashedData = data
    req.session.save(action)
}

function getSessionData(req){
    const flashedData = req.session.flashedData
    req.session.flashedData = ""
    return flashedData
}

module.exports = {
    flashDataToSession,
    getSessionData
}