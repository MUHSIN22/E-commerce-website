var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=> {
    console.log(products);
    res.render('admin/view-products',{admin:true ,products})
  })
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

router.get('/delete-product/:id',(req,res) => {
  let proId = req.params.id;
  productHelper.deleteProduct(proId).then(() => {
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id', async (req,res) => {
  let product = await productHelper.getProductDetails(req.params.id);
  console.log(product)
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id', (req,res) => {
  let id = req.params.id;
  productHelper.updateProduct(req.params.id,req.body).then(() => {
    res.redirect('/admin')
    if(req.files.image){
      let image = req.files.image
      image.mv('./public/images/product-images/'+id+'.jpg')
    }
  })
})

module.exports = router;
