function checkAuthStatus(req,res,next){
    const uid = req.session.uid
    const username = req.session.username

    if(!uid){
        return next()
    }

    res.locals.uid = uid
    res.locals.username = username
    res.locals.isAuth = true
    next()
}

module.exports = checkAuthStatus