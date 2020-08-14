var mongoose = require('mongoose') ;
const Joi = require('joi');
var typeschema = mongoose.Schema({
    title : String,
    description:String,
    link:String
}) ;

const Types= mongoose.model("Types",typeschema);
function ValidateType(data){
    const schema = Joi.object({
        title : Joi.string()
        .min(5)
        .max(15)
        .required(),
        description : Joi.string()
        .min(15)
        .required(),
        link : Joi.string()
        .min(15)
        .required()

    })
    return schema.validate(data) ;
    }
module.exports.Types = Types ;
module.exports.Validate = ValidateType ;

