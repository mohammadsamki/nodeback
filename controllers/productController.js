//  import product model
const Product = require('../models/productModul');
//  get all products
const getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        console.log(error);
    }
}
//  create new product
const createNewProduct = async (req,res)=>{
    console.log('this api for create product');
    try {
        const product = req.body;
        console.log(product);
        //  create new product in the mongo model 
        const newProduct = new Product(product);
        //  save the product in the database
        await newProduct.save();
        res.status(201).json(newProduct);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
        
    }
}

//  update product by id

const updateProductByID = async (req,res)=>{
    try {
        const {id} =req.params;
        const product = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('id not valid');
        }
        const updateProduct = await Product.findByIdAndUpdate(id,{...product,id},{new:true});
        if(!updateProduct){
            res.status(404).json({message:"Product not found"});
        }
        else{
            res.status(200).json(updateProduct);
        }
        
    } catch (error) {
        console.log(error);
    }
}
//  delete product by id

const deleteProductByID = async (req,res)=>{
    try {
        const {id} =req.params;
        console.log('this is the id',id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('id not valid');
        }
        const deleteProduct = await Product.findByIdAndDelete(id);
        console.log(mongoose.Types.ObjectId.isValid(id))

        if(!deleteProduct){
            res.status(404).json({message:"Product not found"});
        }
        else{
            res.status(200).json({message:"Product deleted successfully"});
        }
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllProducts,createNewProduct,updateProductByID,deleteProductByID};