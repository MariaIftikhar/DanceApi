var mongoose = require('mongoose') ;
const Joi = require('joi') ;
var Userschema = mongoose.Schema({
    name : String,
    email:String,
    password:String,
    role:{
        type:String,default:"user"
    }
}) ;

const Users= mongoose.model("Users",Userschema);
function ValidateUser(data){
    const schema = Joi.object({
       name: Joi.string()
        .min(5)
        .max(15)
        .required(),
        email : Joi.string()
        .email()
        .alphanum()
        .min(15)
        .required(),
        password : Joi.string()
        .alphanum()
        .min(5)
        .max(10)
        .required()
    })
    return schema.ValidateUser(data) ;
    }
function ValidateUserLogin(data){
    const schema = Joi.object({
        email : Joi.string()
        .email()
        .alphanum()
        .min(15)
        .required(),
        password : Joi.string()
        .alphanum()
        .min(5)
        .max(10)
        .required()
    })
    return schema.ValidateUserLogin(data) ;
    }
module.exports.Users = Users ;
module.exports.ValidateUser = ValidateUser ;
module.exports.ValidateUserLogin = ValidateUserLogin ;