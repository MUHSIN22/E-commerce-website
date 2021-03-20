const { response } = require('express');
var express = require('express');
const { resolve } = require('promise');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

const verifyLogin = (req,res,next) => {
  if(req.session.user){
    next();
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', async (req, res, next) =>{
  let user = req.session.user
  let cartCount = null;
  if(req.session.user){
    cartCount = await userHelpers.getCartCount(user._id);
  }
  productHelper.getAllProducts().then((products)=> {
    // console.log(products);
    res.render('user/view-products', {products, admin:false , user,cartCount});
  })
  
});
router.get('/login',(req,res) => {
  if(req.session.user){
    res.redirect('/');
  }else{
    res.render('user/login',{loginErr : req.session.userLoginErr});
    req.session.userLoginErr = false
  }
})
router.get('/signup',(req,res) => {
  res.render('user/signup');
})
router.post('/signup',(req,res) => {
  console.log(req.body)
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    req.session.userLoggedIn = true
    req.session.user = response
    res.redirect('/')
  })
})
router.post('/login',(req,res) => {
  userHelpers.doLogin(req.body).then((response)=> {
    if(response.status){
      req.session.user = response.user;
      req.session.user.loggedIn = true;
      res.redirect('/')
    }else{
      req.session.userLoginErr = true
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res) => {
  req.session.user = null
  res.redirect('/login');
})
router.get('/cart',verifyLogin,async(req,res) => {
    let products = await userHelpers.getCartProducts(req.session.user._id)
    let totalAmount = await userHelpers.getTotalAmount(req.session.user._id);

    console.log(products);
    let user = req.session.user;
    let cartEmpty
    if(products.length == 0){
      cartEmpty = true;
    }else{
      cartEmpty = false
    }
    // console.log(products)
    res.render('user/cart' ,{products,user,cartEmpty,totalAmount})
})

router.get('/add-to-cart/:id',verifyLogin, (req,res) => {
  userHelpers.addToCart(req.params.id,req.session.user._id).then(() => {
    res.json({status:true})
  })
})
router.post('/change-product-quantity',(req,res,next)=> {
  userHelpers.changeProductQuantity(req.body).then((response)=>{
    console.log(response)
    res.json(response)
  })
})
router.post('/remove-cart-product',(req,res,next) => {
  userHelpers.removeProduct(req.body).then((response)=>{
    res.json({status:true})
  })
})
router.get('/place-order',verifyLogin, async(req,res) => {
  let total = await userHelpers.getTotalAmount(req.session.user._id);
  res.render('user/order',{total})
})
module.exports = router;