const {getAllProducts,createNewProduct,updateProductByID,deleteProductByID} =require( '../controllers/productController');

const express  = require('express');
const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products',createNewProduct);
router.put('/updateProduct/:id',updateProductByID);
router.delete('/deleteProduct/:id',deleteProductByID);

module.exports = router;