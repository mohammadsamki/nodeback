const  CartModul = require("../models/cartModul");

exports.addToCart = async (req, res) => {
    const {userId,ProductId, quantity} = req.body;
    try {
        let cart  = await CartModul.findOne({user:userId});
        if(!cart)
        {
            cart = new CartModul(
                {
                    user:userId,
                    products:[
                        {product:ProductId,quantity:quantity}
                    ]
                }
            );

        }
        else{
            const existingProducts = cart.products.find(p=>p.product.toString() === ProductId);
            if (existingProducts){
                existingProducts.quantity += quantity;
            }
            else{
                cart.products.push({product:ProductId,quantity:quantity});
            }
        }

         
        await cart.save();
        res.status(201).json(cart);
        
    } catch (error) {
        res.status(500).json({message:error});
        
    }
}

exports.getCart = async (req, res) => {
    const {userId} = req.body;
    try {
        const cart = await CartModul.findOne({user:userId}).populate('products.product');
        if (!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        res.status(200).json(cart);
        
    } catch (error) {
        res.status(500).json({message:error});
        
    }
}

// module.exports = {addToCart,getCart}