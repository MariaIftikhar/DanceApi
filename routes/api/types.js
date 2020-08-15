const express = require('express') ;
let router = express.Router() ;
var {Types}  = require('../../models/types') ;
const ValidateType = require('../../middlewares/validateType');
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin');

router.get('/', async function(req, res) {
  let page =Number(req.query.page?req.query.page:1) ;
  let perPage =Number(req.query.perPag?perPag:10) ;
  let skipRecords = perPage*(page-1) ;
  console.log(req.user) ;
  let types = await Types.find().skip(skipRecords).limit(perPage) ;
  let total = await Types.countDocuments() ;
    return res.send({total,types});
  });
  router.get("/:id", async(req,res)=>{
      try {
        let type = await Types.findById(req.params.id);
        if(!type) return res.status(400).send("Given Type is Not Available") ;
        return res.send(type);
      } catch (error) {
          return res.status(400).send("Invalid Id") ;
      }
      
  });
  router.put('/:id',ValidateType, async function(req, res) {
    let types = await Types.findById(req.params.id) ;
    types.title = req.body.title ;
    types.description = req.body.description ;
    await types.save() ;
    return res.send(types);
  });
  router.delete('/:id', async function(req, res) {
    let types = await Types.findByIdAndDelete(req.params.id) ;
    return res.send(types);
  }); 
  router.post('/',ValidateType, async function(req, res) {
    
    let type = new Types() ;
    type.title = req.body.title ;
    type.description = req.body.description ;
    type.link = req.body.link ;
    await type.save() ;
    return res.send(type);
  });
module.exports = router ;