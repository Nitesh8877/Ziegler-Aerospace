const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authConfig=require('../configs/auth.config');
const constant=require('../utils/constant')
exports.signup=async(req,res)=>{

      try {
        const { username, email, password,role } = req.body;
        console.log(req.body)
        
        //Find duplicate mail
        let user=await User.findOne({email});
        if(user){
            return res.status(200).send({message:"eamil already exists! "});
        }
        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password:bcrypt.hashSync(password,8),
          role
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).send({ 
            message: 'User registered successfully.',
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
    });
      } catch (error)
       {
        console.log(error)
        res.status(500).send({ message: 'An error occurred while registering the user.',
    error:error
    });
      }
    
}

exports.signin=async(req,res)=>{

    try {
        if(!req.body.email){
            return res.status(400).send({
                message:"Email is not provided"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message:"Password is not provided"
            })
        }
    
        let user=await User.findOne({email:req.body.email})
        if(user===null){
            return res.status(401).send({
                message:"User with the given email not found!"
            })
        }
        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordValid){
            return res.status(403).send({
                message:"Invalid Password"
            })
        }

        const token=jwt.sign({email:req.body.email},authConfig.secret,{expiresIn:3600})
        
        res.status(200).send({
            message:"Login successful",
            username:user.username,
            email:user.email,
            accountType:user.role,
            token:token
        })

    } catch (error) {
        res.status(500).send({
            message:"Something went wrong"
        })
    }
}
