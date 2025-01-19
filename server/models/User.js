const mongoose=require('mongoose')
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        // Define The Roles
        accountType:{
            type: String,
            enum:['Admin','Donor','Recepient'],
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        //To Ensure Authentication (Those Registered Since Long Help Identify Trusted Users)
        registrationDate:{
            type:Date,
            default:Date.now()
        },
        //Approval From Admin (Only Approved Users Can Donate And Receive)
        approved:{
            type:Boolean,
            default:false
        },
        address:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Address"
        },
        image:{
            type:String
        },
        token:{
            type:String
        },
        resetPasswordExpires:{
            type:Date
        }
    }
)

module.exports=mongoose.model("User",userSchema)