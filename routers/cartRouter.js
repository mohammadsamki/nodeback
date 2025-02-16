const {addToCart,getCart} = require("../controllers/cartControoler");
const express  = require('express');
const router = express.Router();

router.post('/addToCart', addToCart);
router.post('/getCart',getCart);

module.exports = router;