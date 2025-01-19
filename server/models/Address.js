const mongoose=require('mongoose')
const addressSchema=new mongoose.Schema({
    //For Locating Nearby Users
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:Number
    },
    streetAddress:{
        type:String
    },
    landmark:{
        type:String
    }
})

module.exports=mongoose.model("Address",addressSchema)