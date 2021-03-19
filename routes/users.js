const { response } = require('express');
var express = require('express');
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
    let user = req.session.user;
    console.log(products)
    res.render('user/cart' ,{products,user})
})

router.get('/add-to-cart/:id',verifyLogin, (req,res) => {
  console.log("api call")
  userHelpers.addToCart(req.params.id,req.session.user._id).then(() => {
    console.log('added to cart = '+req.params.id+"userId="+req.session.user._id);
    res.json({status:true})
  })
})
module.exports = router;