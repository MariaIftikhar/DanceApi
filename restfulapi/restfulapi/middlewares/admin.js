function Admin(req,res,next) {
    console.log(req.user.role) ;
    if(req.user.role != "admin") return res.status(403).send("You are not authorized") ;
    next() ;
    
}
module.exports = Admin ;