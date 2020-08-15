 const jwt = require("jsonwebtoken") ;
 const config = require("config") ;
 const {User} = require("../models/users")
 async function  AuthUser(req,res,next) {
     try {
        let token = req.header("x-auth-token");
        if(!token) return res.status(400).send("Token not provided") ;
       let user = jwt.verify(token, config.get("getToken")) ;
       req.user= user ;  
     } catch (error) {
         return res.status(400).send("Invalid Token") ;
     }
    
    next() ;
}
module.exports = AuthUser;
