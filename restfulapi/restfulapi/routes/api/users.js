var express = require('express');
const { Users } = require('../../models/users');
var router = express.Router();
var bcrypt = require('bcrypt') ;
const _ = require('lodash') ;
const token = require('jsonwebtoken') ;
const config = require('config') ;
/* GET users listing. */
router.post('/register', async function(req, res) {
  console.log(req.body.email) ;
 let user = await Users.findOne({email:req.body.email}) ;
 if(user) return res.status(400).send("User with given Email already exist") ;
  user = new Users() ;
  user.name = req.body.name ;
  user.email = req.body.email ;
  user.password = req.body.password ;
  let salt = await bcrypt.genSalt(10) ;
   user.password = await bcrypt.hash(user.password,salt) ;
  await user.save() ;
  return res.send(_.pick(user,["name","email","role"])) ;
});
router.post('/login',async function (req,res) {
  console.log(req.body.email) ;
  let user = await Users.findOne({email:req.body.email}) ;
  if(!user) return res.status(400).send("Sign Up first or Invalid Email") ; 
  let isValid = await bcrypt.compare(req.body.password,user.password)   ;
  if(!isValid) return res.status(401).send("Invalid Password or Forgotten Password") ;
  let token1 = token.sign({_id:user._id,name:user.name,role:user.role},config.get("getToken"))  ;
  return res.send(token1) ;

});
module.exports = router;
