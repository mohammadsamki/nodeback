const mongoose = require('mongoose');

//  create a cart schema that contain : [product, quantity],user

const CartSchema = new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref :'AuthUser',require:true,unique:true},
    products : [
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref :'products',require:true},
            quantity:{type:Number,require:true}
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('cart', CartSchema);