const mongoose = require('mongoose')
const recepientProfileSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    
    
    
    recepient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    frequencyOfNeed: {
        type: String,
        enum: ['Daily', 'Weekly', 'Occasionally'],
        required: true
    },
    requestDescription: {
        type: String,
        required: true
    },
    typeOfFood: {
        type: String,
        enum: ['Perishable', 'Non-Perishable', 'Cooked', 'Raw Ingredients'],
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    receivingOption: {
        type: String,
        enum: ['PickUp', 'Delivery'],
        required: true
    },
    prefferedPickUpTime: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: "Not Rated"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    phonenumber:{
        type:Number,
        required:true,
      },
    // requestHistory:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Request"
    // }
})

module.exports = mongoose.model("RecepientProfile", recepientProfileSchema)