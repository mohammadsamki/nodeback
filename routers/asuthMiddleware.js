const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET


const AuthMiddleware = (req,res,next)=>{
    const token =req.header('Auth')
    console.log(req.header('Auth'))
    if(!token){
        res.status(401).json({message:"Auth token not found"})
    }
    try {
        const verify = jwt.verify(token,JWT_SECRET);
        req.user= verify;
        next();
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}
module.exports = AuthMiddleware;