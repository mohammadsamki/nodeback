const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');
//  get method to get all users
const getallUsers = async (req ,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        console.log(error);
    }
}

const createNewUser = async (req,res)=>{
    console.log('this api for create user');
    try {
        const user = req.body;
        console.log(user);
        //  create new user in the mongo model 
        const newUser = new User(user);
        //  save the user in the database
        await newUser.save();
        res.status(201).json(newUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
        
    }
}
const findUserByRole = async (req,res)=>{
    try {
        const role = req.body.role;
        console.log(role);
        const users = await User.find({role:role});
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}
//  add function to delete user by id using params 
const deleteUserByID = async (req,res)=>{
    try {
        const {id} =req.params;
        console.log('this is the id',id);
        const deleteUser = await User.findByIdAndDelete(id);
        console.log(mongoose.Types.ObjectId.isValid(id))
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('id not valid');
        }
        if(!deleteUser){
            res.status(404).json({message:"User not found"});
        }
        else{
            res.status(200).json({message:"User deleted successfully"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
        
    }
}
module.exports= {getallUsers,createNewUser,findUserByRole,deleteUserByID};

