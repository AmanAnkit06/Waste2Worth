const mongoose = require("mongoose");
const { type } = require("os");
const donorProfileSchema = new mongoose.Schema({

  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  donationFrequency: {
    type: String,
    enum: ["Daily", "Weekly", "Occasionally"],
    required: true,
  },
  donationDescription: {
    type: String,
    required: true,
  },
  typeOfFood: {
    type: String,
    enum: ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"],
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  deliveryOption: {
    type: String,
    enum: ["PickUp", "Delivery"],
    required: true,
  },
  prefferedPickUpTime: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    default: "Not Rated",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phonenumber:{
    type:Number,
    required:true,
  },
  // location: {
  //   type: String,
  //   enum: [
  //     "Alipurduar",
  //     "Bankura",
  //     "Birbhum",
  //     "Cooch Behar",
  //     "Dakshin Dinajpur",
  //     "Darjeeling",
  //     "Hooghly",
  //     "Howrah",
  //     "Jalpaiguri",
  //     "Jhargram",
  //     "Kalimpong",
  //     "Kolkata",
  //     "Malda",
  //     "Murshidabad",
  //     "Nadia",
  //     "North 24 Parganas",
  //     "Paschim Bardhaman",
  //     "Paschim Medinipur",
  //     "Purba Bardhaman",
  //     "Purba Medinipur",
  //     "Purulia",
  //     "South 24 Parganas",
  //     "Uttar Dinajpur"
  //   ],
  //   required: true,
  // },
  
  // donationHistory:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"Donation"
  // }
 
});

module.exports = mongoose.model("DonorProfile", donorProfileSchema);

// const mongoose = require("mongoose");

// const donorProfileSchema = new mongoose.Schema({
//   donor: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   donationFrequency: {
//     type: String,
//     enum: ["Daily", "Weekly", "Occasionally"],
//     required: true,
//   },
//   donationDescription: {
//     type: String,
//     required: true,
//   },
//   typeOfFood: {
//     type: String,
//     enum: ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"],
//     required: true,
//   },
//   quantity: {
//     type: String,
//     required: true,
//   },
//   deliveryOption: {
//     type: String,
//     enum: ["PickUp", "Delivery"],
//     required: true,
//   },
//   prefferedPickUpTime: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: String,
//     default: "Not Rated",
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       default: "Point",
//       required: true,
//     },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       required: true,
//     },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Enable geospatial queries
// donorProfileSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("DonorProfile", donorProfileSchema);
