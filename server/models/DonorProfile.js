const mongoose=require('mongoose')
const donorProfileSchema=new mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    donationFrequency:{
        type:String,
        enum:['Daily','Weekly','Occasionally'],
        required:true
    },
    donationDescription:{
        type:String,
        required:true        
    },
    typeOfFood:{
        type:String,
        enum:['Perishable','Non-Perishable','Cooked','Raw Ingredients'],
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    deliveryOption:{
        type:String,
        enum:['PickUp','Delivery'],
        required:true
    },
    prefferedPickUpTime:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        default:"Not Rated" 
    },
    createdAt:{
        type: Date,
		default: Date.now
    }
    // donationHistory:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Donation"
    // }
})

module.exports=mongoose.model("DonorProfile",donorProfileSchema)