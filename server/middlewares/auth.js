const jwt=require('jsonwebtoken')
const User=require('../models/User')
require('dotenv').config()

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ','')
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Is Missing'
            })
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user=decode

        }catch(error){
            return res.status(401).json({
                success:false,
                message:'Token Is Invalid'
            })
        }
        next()
    }catch(error){
        return res.status(500).json({
            success:true,
            messsage:'Something Went Wrong While Validating Token'
        })
    }
}

exports.isDonor=async(req,res,next)=>{
    try{
        const userDetails=await User.findOne({email:req.user.email})

        if(userDetails.accountType!=='Donor'){
            return res.status(401).json({
                success:false,
                message:'This Is A Protected Route For Donor'
            })
        }

        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Cannot Be Verified'
        })
    }
}

exports.isRecepient=async(req,res,next)=>{
    try{
        const userDetails=await User.findOne({email:req.user.email})

        if(userDetails.accountType!=='Recepient'){
            return res.status(401).json({
                success:false,
                message:'This Is A Protected Route For Recepient'
            })
        }
        
        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Cannot Be Verified'
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        const userDetails=await User.findOne({email:req.user.email})

        if(userDetails.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'This Is A Protected Route For Admin'
            })
        }
        
        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Cannot Be Verified'
        })
    }
}