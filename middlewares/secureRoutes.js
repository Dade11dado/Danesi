function secureRoutes(req,res,next){
    if(!res.locals.isAuth){
        return res.redirect("/")
    }else{
       next() 
    }
}

module.exports = secureRoutes