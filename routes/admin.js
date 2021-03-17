var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    {
      price: "100000",
      name: "I Phone 11",
      image : "https://cdn.vox-cdn.com/thumbor/SJcmPEheS_cbdujd4zbIPTpuXfg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315959/akrales_181019_3014_0770.jpg"
    },
    {
      price: "100000",
      name: "I Phone 11",
      image : "https://cdn.vox-cdn.com/thumbor/SJcmPEheS_cbdujd4zbIPTpuXfg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315959/akrales_181019_3014_0770.jpg"
    },
    {
      price: "100000",
      name: "I Phone 11",
      image : "https://cdn.vox-cdn.com/thumbor/SJcmPEheS_cbdujd4zbIPTpuXfg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315959/akrales_181019_3014_0770.jpg"
    },
    {
      price: "100000",
      name: "I Phone 11",
      image : "https://cdn.vox-cdn.com/thumbor/SJcmPEheS_cbdujd4zbIPTpuXfg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315959/akrales_181019_3014_0770.jpg"
    }
  ]

  res.render('admin/view-products',{admin:true ,products})
});
router.get('/add-product',(req,res) => {
  res.render('admin/add-product')
})
router.post('/add-product',(req,res) => {
  
  productHelper.addProduct(req.body,(id) => {
    let image = req.files.image
    image.mv('./public/images/product-images/'+id+'.jpg',(err,done) => {
      if(!err){
        res.render('admin/add-product')
      }else{
        console.log(err);
      }
    })
  });
})

module.exports = router;
