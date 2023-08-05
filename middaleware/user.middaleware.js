const User=require('../models/user.model');
const jwt=require('jsonwebtoken')
const authConfig=require('../configs/auth.config')
validateField=async(req,res,next)=>{

        if(!req.body.username){
            return res.status(400).send({
                message:"Failed! Username is not provided"
            })
        }

        if(!req.body.email){
            return res.status(400).send({
                message:"Failed! Email is not provided"
            })
        }

        if(!req.body.password){
            return res.status(400).send({
                message:"Failed! Password is not provided"
            })
        }
    
        next();
}

const verifyToken=(req,res,next)=>{
    let token=req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message:"Token not provided"
        })
    }
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            })
        }
        req.email=decoded.email
        req._id=decoded._id
        next();
    })
}


module.exports={
    validateField:validateField,
    verifyToken:verifyToken,
}