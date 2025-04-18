// const User = require('../models/User')
// const DonorProfile = require('../models/DonorProfile')
// const RecepientProfile = require('../models/RecepientProfile')

// //To Add Donation Details
// exports.addDonorDetails = async (req, res) => {
//     try {
//         const {
//             donationFrequency, donationDescription, typeOfFood, quantity,
//             deliveryOption, prefferedPickUpTime } = req.body
//         const userId = req.user.id

//         //Check Whether All Required Fields Are Present Or Not    
//         if (!donationFrequency || !donationDescription || !typeOfFood || !quantity || !deliveryOption || !prefferedPickUpTime) {
//             return res.status(403).json({
//                 success: false,
//                 message: "All Fields Are Required"
//             })
//         }

//         //Check Whether User Exists Or Not
//         const checkUser = await User.findById(userId)
//         if (!checkUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Does Not Exists"
//             })
//         }

//         //Create Donor Profile With The Given Fields
//         const donorDetails = await DonorProfile.create({
//             donor: userId,
//             donationFrequency,
//             donationDescription,
//             typeOfFood,
//             quantity,
//             deliveryOption,
//             prefferedPickUpTime,
//             createdAt: Date.now()
//         })
//         return res.status(200).json({
//             success: true,
//             message: "Donor Created Successfully",
//             donorDetails
//         })
//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({
//             success: false,
//             message: "Cannot Update Donor Details"
//         })
//     }
// }

// //To View Recepients Who Has Created One Or More Requests 
// exports.viewRecepients = async (req, res) => {
//     try {

//         //Fetch All Recepient Profile  
//         const allRecepients = await RecepientProfile.find({})
//         return res.status(200).json({
//             success: true,
//             message: "All Recepients Fetched Successfully",
//             data: { allRecepients }
//         })
//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({
//             success: false,
//             message: "Recepients Cannot Be Fetched"
//         })
//     }
// }

// //To Edit Donation Details
// exports.editDonorDetails = async (req, res) => {
//     try {
//         const donor = await DonorProfile.findById(req.body.donorId)

//         //Check Whether The Profile Exists Or Not
//         if (!donor) {
//             return res.status(404).json({ error: "Donor Not Found" })
//         }

//         //Update The Profile
//         if (req.body.donationFrequency !== undefined)
//             donor.donationFrequency = req.body.donationFrequency
//         if (req.body.donationDescription !== undefined)
//             donor.donationDescription = req.body.donationDescription
//         if (req.body.typeOfFood !== undefined)
//             donor.typeOfFood = req.body.typeOfFood
//         if (req.body.quantity !== undefined)
//             donor.quantity = req.body.quantity
//         if (req.body.deliveryOption !== undefined)
//             donor.deliveryOption = req.body.deliveryOption
//         if (req.body.prefferedPickUpTime !== undefined)
//             donor.prefferedPickUpTime = req.body.prefferedPickUpTime
//         await donor.save()

//         const updatedDonor = await DonorProfile.findOne({
//             _id: req.body.donorId
//         })
//             .populate({
//                 path: "donor"
//             })
//             .exec()

//         res.json({
//             success: true,
//             message: "Donation Details Updated Successfully",
//             data: updatedDonor
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message
//         })
//     }
// }

// //To Get Details Of A Particular Donation
// exports.getFullDonorDetails = async (req, res) => {
//     try {
//         const { donorId } = req.body

//         //Fetch The Details 
//         const donorDetails = await DonorProfile.findOne({
//             _id: donorId,
//         })
//             .populate({
//                 path: "donor"
//             })
//             .exec()

//         return res.status(200).json({
//             success: true,
//             data: {
//                 donorDetails
//             }
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //To View All Donation Details Of One Donor
// exports.viewDetails = async (req, res) => {
//     try {
//         const userId = req.user.id
//         const checkUser = await User.findById(userId)

//         //Check Whether User Exists Or Not
//         if (!checkUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Does Not Exists"
//             })
//         }
//         const donorDetails = await DonorProfile.find({
//             donor: userId
//         })

//         //Check Whether User Had Created Donation Or Not
//         if (!donorDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Details Added Yet"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: "All Details Fetched Successfully",
//             data: donorDetails
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //To Delete A Donation Detail
// exports.deleteDetails = async (req, res) => {
//     try {
//         const { donorId } = req.body
//         const donorDetails = await DonorProfile.findOne({ _id: donorId })

//         //Check Whether The Detail Exist Or Not 
//         if (!donorDetails) {
//             return res.status(404).json({ message: "Donor Details Not Found" })
//         }

//         //Delete The Detail
//         await DonorProfile.findByIdAndDelete(donorId)

//         return res.status(200).json({
//             success: true,
//             message: "Donor Details Deleted Successfully",
//         })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: "Server Error",
//             error: error.message
//         })
//     }
// }

const User = require('../models/User')
const DonorProfile = require('../models/DonorProfile')
const RecepientProfile = require('../models/RecepientProfile')

exports.addDonorDetails = async (req, res) => {
    try {
        const {
           latitude, longitude, donationFrequency, donationDescription, typeOfFood, quantity,
           deliveryOption, prefferedPickUpTime, phonenumber
        } = req.body
        const userId = req.user.id

        if (
           !latitude||!longitude||!donationFrequency || !donationDescription || !typeOfFood || !quantity ||
           !deliveryOption || !prefferedPickUpTime || !phonenumber
        ) {
            return res.status(403).json({
                success: false,
                message: "All Fields Are Required"
            });
        }

        const checkUser = await User.findById(userId)
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Does Not Exist"
            });
        }

        const donorDetails = await DonorProfile.create({
           
            latitude,
            longitude,
            donor: userId,
            donationFrequency,
            donationDescription,
            typeOfFood,
            quantity,
            deliveryOption,
            prefferedPickUpTime,
            phonenumber,
            createdAt: Date.now()
        });

        return res.status(200).json({
            success: true,
            message: "Donor Created Successfully",
            donorDetails
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Cannot Update Donor Details"
        });
    }
};

//To View Recepients Who Has Created One Or More Requests 
exports.viewRecepients = async (req, res) => {
    try {

        //Fetch All Recepient Profile  
        const allRecepients = await RecepientProfile.find({})
        return res.status(200).json({
            success: true,
            message: "All Recepients Fetched Successfully",
            data: { allRecepients }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Recepients Cannot Be Fetched"
        })
    }
}

//To Edit Donation Details
exports.editDonorDetails = async (req, res) => {
    try {
        const donor = await DonorProfile.findById(req.body.donorId)

        //Check Whether The Profile Exists Or Not
        if (!donor) {
            return res.status(404).json({ error: "Donor Not Found" })
        }

        //Update The Profile
        if (req.body.donationFrequency !== undefined)
            donor.donationFrequency = req.body.donationFrequency
        if (req.body.donationDescription !== undefined)
            donor.donationDescription = req.body.donationDescription
        if (req.body.typeOfFood !== undefined)
            donor.typeOfFood = req.body.typeOfFood
        if (req.body.quantity !== undefined)
            donor.quantity = req.body.quantity
        if (req.body.deliveryOption !== undefined)
            donor.deliveryOption = req.body.deliveryOption
        if (req.body.prefferedPickUpTime !== undefined)
            donor.prefferedPickUpTime = req.body.prefferedPickUpTime
        await donor.save()

        const updatedDonor = await DonorProfile.findOne({
            _id: req.body.donorId
        })
            .populate({
                path: "donor"
            })
            .exec()

        res.json({
            success: true,
            message: "Donation Details Updated Successfully",
            data: updatedDonor
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}



//To Get Details Of A Particular Donation
exports.getFullDonorDetails = async (req, res) => {
    try {
        const { donorId } = req.body

        //Fetch The Details 
        const donorDetails = await DonorProfile.findOne({
            _id: donorId,
        })
            .populate({
                path: "donor"
            })
            .exec()

        return res.status(200).json({
            success: true,
            data: {
                donorDetails
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//To View All Donation Details Of One Donor
exports.viewDetails = async (req, res) => {
    try {
        const userId = req.user.id
        const checkUser = await User.findById(userId)

        //Check Whether User Exists Or Not
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Does Not Exists"
            })
        }
        const donorDetails = await DonorProfile.find({
            donor: userId
        })

        //Check Whether User Had Created Donation Or Not
        if (!donorDetails) {
            return res.status(404).json({
                success: false,
                message: "No Details Added Yet"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All Details Fetched Successfully",
            data: donorDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//To Delete A Donation Detail
exports.deleteDetails = async (req, res) => {
    try {
        const { donorId } = req.body
        const donorDetails = await DonorProfile.findOne({ _id: donorId })
        
        //Check Whether The Detail Exist Or Not 
        if (!donorDetails) {
            return res.status(404).json({ message: "Donor Details Not Found" })
        }

        //Delete The Detail
        await DonorProfile.findByIdAndDelete(donorId)

        return res.status(200).json({
            success: true,
            message: "Donor Details Deleted Successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

// To Get Nearby Donors Based on Latitude and Longitude
exports.getNearbyDonors = async (req, res) => {
    try {
        const { latitude, longitude} = req.body;

        if (!latitude || !longitude ) {
            return res.status(400).json({
                success: false,
                message: "Latitude, Longitude And Max Distance (In Km) Are Required"
            });
        }

        const donors = await DonorProfile.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                   
                }
            }
        }).populate("donor");

        return res.status(200).json({
            success: true,
            message: "Nearby Donors Fetched Successfully",
            data: donors
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch Nearby Donors"
        });
    }
};