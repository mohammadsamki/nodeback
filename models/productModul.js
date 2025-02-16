const mongoose = require('mongoose');


//  create a product schema that contain :
//  name , price , dis , image
const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    dis :{type:String, required:true},
    image:{type:String, required:true},
});


//  create a model for the product schema
module.exports = mongoose.model('products', productSchema);