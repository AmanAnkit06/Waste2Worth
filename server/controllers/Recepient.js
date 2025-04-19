const DonorProfile = require('../models/DonorProfile')
const User = require('../models/User')
const RecepientProfile = require('../models/RecepientProfile')

//To View Donors Who Has Created One Or More Donations
exports.viewDonors = async (req, res) => {
    try {

        //Fetch All Donor Profile
        const allDonors = await DonorProfile.find({})
        return res.status(200).json({
            success: true,
            message: "All Donors Fetched Successfully",
            data: { allDonors }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Donors Cannot Be Fetched"
        })
    }
}

//To Add Recepient Details
exports.addRecepientDetails = async (req, res) => {
    try {
        const {
            latitude,longitude,frequencyOfNeed, requestDescription, typeOfFood, quantity,
            receivingOption, prefferedPickUpTime ,phonenumber} = req.body
        const userId = req.user.id

        //Check Whether All Required Fields Are Present Or Not
        if (!latitude || !longitude || !frequencyOfNeed || !requestDescription || !typeOfFood || !quantity || !receivingOption || !prefferedPickUpTime || !phonenumber) {
            return res.status(403).json({
                success: false,
                message: "All Fields Are Required"
            })
        }

        //Check Whether User Exists Or Not
        const checkUser = await User.findById(userId)
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Does Not Exists"
            })
        }

        //Create Recepient Profile With The Given Fields
        const recepientDetails = await RecepientProfile.create({
            latitude,
            longitude,            
            recepient: userId,
            frequencyOfNeed,
            requestDescription,
            typeOfFood,
            quantity,
            receivingOption,
            prefferedPickUpTime,
            phonenumber,
            createdAt: Date.now()
        })
        return res.status(200).json({
            success: true,
            message: "Recepient Created Successfully",
            recepientDetails
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Cannot Update Recepient Details"
        })
    }
}

// To Get Details Of A Particular Donor
exports.viewSingleCardDetails = async (req, res) => {
    try { 

        const donorDetails = await DonorProfile.findOne({ _id: req.body.donorId })
        .populate({
            path: "donor",
            
            populate: {
                path: "address"
            }
        })
        .exec()

        // Check Whether The Detail Exist Or Not 
        if (!donorDetails) {
            return res.status(404).json({ message: "Donor Details Not Found" })
        }
        
        return res.status(200).json({
            success: true,
            donorDetails: donorDetails,
            message: "Donor Details Fetched Successfully",
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

//To Edit Recepient Details
exports.editRecepientDetails = async (req, res) => {
    try {
        const recepient = await RecepientProfile.findById(req.body.recepientId)

        //Check Whether The Profile Exists Or Not
        if (!recepient) {
            return res.status(404).json({ error: "Recepient Not Found" })
        }

        //Update The Profile
        if (req.body.latitude !== undefined)
            recepient.latitude = req.body.latitude  
        if (req.body.longitude !== undefined)
            recepient.longitude = req.body.longitude

        if (req.body.frequencyOfNeed !== undefined)
            recepient.frequencyOfNeed = req.body.frequencyOfNeed
        if (req.body.requestDescription !== undefined)
            recepient.requestDescription = req.body.requestDescription
        if (req.body.typeOfFood !== undefined)
            recepient.typeOfFood = req.body.typeOfFood
        if (req.body.quantity !== undefined)
            recepient.quantity = req.body.quantity
        if (req.body.receivingOption !== undefined)
            recepient.receivingOption = req.body.receivingOption
        if (req.body.prefferedPickUpTime !== undefined)
            recepient.prefferedPickUpTime = req.body.prefferedPickUpTime
       if (req.body.phonenumber !== undefined)
            recepient.phonenumber = req.body.phonenumber

        await recepient.save()

        const updatedRecepient = await RecepientProfile.findOne({
            _id: req.body.recepientId
        })
            .populate({
                path: "recepient"
            })
            .exec()

        res.json({
            success: true,
            message: "Recepient Details Updated Successfully",
            data: updatedRecepient
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

//To Get Details Of A Particular Recepient
exports.getFullRecepientDetails = async (req, res) => {
    try {
        const { recepientId } = req.body

        //Fetch The Details 
        const recepientDetails = await RecepientProfile.findOne({
            _id: recepientId,
        })
            .populate({
                path: "recepient"
            })
            .exec()

        return res.status(200).json({
            success: true,
            data: {
                recepientDetails
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//To View All Request Details Of One Recepient
exports.viewRecepientDetails = async (req, res) => {
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
        const recepientDetails = await RecepientProfile.find({
            recepient: userId
        })

        //Check Whether User Had Created Request Or Not
        if (!recepientDetails) {
            return res.status(404).json({
                success: false,
                message: "No Details Added Yet"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All Details Fetched Successfully",
            data: recepientDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//To Delete A Recepient Detail
exports.deleteRecepientDetails = async (req, res) => {
    try {
        const { recepientId } = req.body
        const recepientDetails = await RecepientProfile.findOne({ _id: recepientId })

        //Check Whether The Detail Exist Or Not 
        if (!recepientDetails) {
            return res.status(404).json({ message: "Recepient Details Not Found" })
        }

        //Delete The Detail
        await RecepientProfile.findByIdAndDelete(recepientId)

        return res.status(200).json({
            success: true,
            message: "Recepient Details Deleted Successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        })
    }
}