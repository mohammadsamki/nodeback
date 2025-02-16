const AuthUserModel = require('../models/authUserModul');
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../routers/asuthMiddleware');


const JWT_SECRET = process.env.JWT_SECRET 
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const REFRESH_TOKENS = [];

const register = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const user = await AuthUserModel({username,email,password});
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await AuthUserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const accessToken = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1d'});
        const refreshToken = jwt.sign({id:user._id},JWT_REFRESH_SECRET,{expiresIn:'2d'});
        REFRESH_TOKENS.push(refreshToken);
        res.status(200).json({message:"Login successful",accessToken,refreshToken,user:{id:user._id,email:user.email}});
        
    } catch (error) {
        res.status(500).json({message:error});
        
    }
}
const refreshToken =(req,res)=>{
    const {token}=req.body;
    console.log(token)
    if (!token || !REFRESH_TOKENS.includes(token)){
        return res.status(403).json({message:"User not authenticated"});
    }
    jwt.verify(token,JWT_REFRESH_SECRET,(err,user)=>{
        if(err) return res.status(403).json({message:"invaled refresh token"})
        const newAccessToken = jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'1d'});
    res.status(200).json({accessToken:newAccessToken});
    })
} 
const home = async (req,res)=>{
    try {
        const user = await AuthUserModel.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports = {register,login,refreshToken,home}