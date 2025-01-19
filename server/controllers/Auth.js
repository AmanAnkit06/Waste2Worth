const User=require('../models/User')
const Otp=require('../models/Otp')
const Address=require('../models/Address')
const mailSender=require('../utils/mailSender')
const {passwordUpdated}=require('../mailTemplates/passwordUpdate')
const otpGenerator=require('otp-generator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.sendOtp=async(req,res)=>{
    try{
        const {email}=req.body

        const checkUserPresent=await User.findOne({email})
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User Is Already Registered'
            })
        }
        //Generating OTP Till Getting Unique
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        let result=await Otp.findOne({otp:otp}) 
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result=await Otp.findOne({otp:otp})
        }

        const otpPayload={email,otp}
        const otpBody=await Otp.create(otpPayload)
        console.log("OTP Body",otpBody)
        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.signup=async(req,res)=>{
    try{
        const{
            name,email,password,confirmPassword,
            accountType,phoneNo,otp}=req.body

        if(!name||!email||!password||!confirmPassword||!phoneNo||!otp){
            return res.status(403).send({
                success:false,
                message:'All Fields Are Required'
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password And Confirm Password Do Not Match'
            })
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Already Exists'
            })
        }
        
        //Checking Otp Validation And Matching
        const response=await Otp.find({email}).sort({createdAt:-1}).limit(1)
        if(response.length==0){
            return res.status(400).json({
                success:false,
                message:'Otp Not Valid'
            })
        }        
        else if(otp!==response[0].otp){
            return res.status(400).json({
                success:false,
                message:'Otp Does Not Match'
            })
        }

        //Hashing The Password
        const hashedPassword=await bcrypt.hash(password,10)

        const addressDetails=await Address.create({
            city:null,
            state:null,
            pincode:null,
            streetAddress:null,
            landmark:null
        })

        const user=await User.create({
            name,email,phoneNo,
            password:hashedPassword,
            accountType,
            address:addressDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })
        
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            user
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"User Cannot Be Registered"
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:'All Fields Are Required'
            })
        }

        const user=await User.findOne({email}).populate("address")
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User Not Signed-Up'
            })
        }

        //Comparing Password And Generating Token
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign({
                email:user.email,
                id:user._id,
                accountType:user.accountType
            },process.env.JWT_SECRET,
            {expiresIn:'24h'})

            user.token=token
            user.password=undefined

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie('token',token,options).status(200).json({
                success:true,
                token,user,
                message:'Login Successful'
            })
        }else{
            return res.status(401).json({
                success:false,
                message:'Password Is Incorrect'
            })
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Login Failed'
        })
    }
}

exports.changePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword,confirmPassword}=req.body

        if(!oldPassword||!newPassword||!confirmPassword){
            return res.status(403).json({
                success:false,
                message:'All Fields Are Required'
            })
        }

        if(newPassword!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password And Confirm Password Do Not Match'
            })
        }

        const userDetails=await User.findById(req.user.id)
        if(await bcrypt.compare(oldPassword,userDetails.password)){
            const encryptedPassword=await bcrypt.hash(newPassword,10)
            const updatedUserDetails=await User.findByIdAndUpdate(
                req.user.id,
                {password:encryptedPassword},
                {new:true}
            )

            //Sending Successful Password Updation Email
            const emailResponse=await mailSender(
                updatedUserDetails.email,
                'Password For Your Account Has Been Updated',
                passwordUpdated(updatedUserDetails.email,
                    `Password Updated Successfully For ${updatedUserDetails.name}`
                )
            )
            return res.status(200).json({
                success:true,
                message:'Password Updated Successfully'
            })             
        }else{
            return res.status(401).json({
                success:false,
                message:'Old Password Is Incorrect'
            })
    }
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Error While Updating Password'
        })
    }
}