const User=require('../models/User')

exports.viewUser=async(req,res)=>{
    try{
        const allUsers =await User.find({
            approved: false
        })
        return res.status(200).json({
            success:true,
            message: "All Users Fetched Successfully",
            allUsers
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"User Cannot Be Fetched"
        })
    }
}

exports.approveUsers=async(req,res)=>{
    try{
        const {email} =req.body
    const userPresent=await User.findOne({email})
    if(!userPresent){
        return res.status(401).json({
            success:false,
            message:"User Does Not Exist"
        })
    }
    userPresent.approved=true
    await userPresent.save()
    return res.status(200).json({
        success:true,
        message:"User Approved"
    }) 
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Cannot Approve User"
        })
    }
}