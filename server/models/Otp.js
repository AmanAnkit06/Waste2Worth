const mongoose=require('mongoose')
const mailSender=require('../utils/mailSender')
const emailTemplate=require('../mailTemplates/emailVerification')

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    //For Automatic Expiration After 5 Minutes
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

//Define A Function To Send Verification Email
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        )        
    }catch(error){
        console.log("Error Occured While Sending Email",error)
    }
}

//Pre Save Hook To Send Email Before Storing In Database
otpSchema.pre('save',async function(next){
    console.log("New Document Saved To Database")
    //Only Send Email When Document Is Created
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp)
    }
    next()
})

const OTP=mongoose.model("Otp",otpSchema)
module.exports=OTP