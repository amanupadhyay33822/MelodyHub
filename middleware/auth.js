const User = require("../models/User")
const jwt = require("jsonwebtoken");
 
require("dotenv").config();

exports.isAuthenticated = async (req,res, next) => {
    try{ 
        console.log("hi");
       //fetch tokenc
       const token = req.headers.authorization.replace("Bearer ", "") || req.headers.cookie.replace("token=","");
    
    //check for empty token
    if(!token){
        return res.status(401).json({
            success:false,
            message:"token required",
        });
    }
    
    //verify token
    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
      req.user= await User.findById(decoded._id);
     
      next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:err.message 
        });
    }
    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        });
    }
}