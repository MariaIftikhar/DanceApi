const {Validate} = require("../models/types") ;
 function  ValidateType(req,res,next) {
    let {error} = new Validate(req.body) ;
    if (error) return res.status(400).send(error.details[0].message) ;
    next() ;
}
module.exports = ValidateType;
