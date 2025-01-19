const Address = require("../models/Address");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose")

// Method For Updating A Profile
exports.updateProfile = async (req, res) => {
    try {
        const { city = "", state = "", pincode = "", streetAddress = "", landmark = "", name = "", phoneNo = "" } = req.body;
        const id = req.user.id;

        // Find The Profile By Id
        const userDetails = await User.findById(id).populate("address");
        const addressId = userDetails.address._id;
        const addressDetails = await Address.findById(addressId);

        // Update The Profile Fields
        addressDetails.city = city;
        addressDetails.state = state;
        addressDetails.pincode = pincode;
        addressDetails.streetAddress = streetAddress;
        addressDetails.landmark = landmark;

        // Save The Updated Profile
        await addressDetails.save();
        userDetails.address.city = city;
        userDetails.address.state = state;
        userDetails.address.pincode = pincode;
        userDetails.address.streetAddress = streetAddress;
        userDetails.address.landmark = landmark;
        userDetails.name = name;
        userDetails.phoneNo = phoneNo;
        await userDetails.save();
        return res.json({
            success: true,
            message: "Profile Updated Successfully",
            userDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        // Delete Assosiated Address With The User
        await Address.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.address),
        })

        // Now Delete User
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "User Cannot Be Deleted" });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};