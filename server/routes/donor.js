// const express = require("express")
// const router = express.Router()
// const {
//     addDonorDetails,
//     viewRecepients,
//     editDonorDetails,
//     getFullDonorDetails,
//     viewDetails,
//     deleteDetails
// } = require("../controllers/Donor")

// const { auth, isDonor } = require("../middlewares/auth")

// //Route To Add Donor Details
// router.post("/add-donor-details", auth, isDonor, addDonorDetails)

// //Route To View Recepient Details
// router.get("/view-recepients", auth, isDonor, viewRecepients)

// //Route To Edit Donor Details
// router.post("/edit-donor-details", auth, isDonor, editDonorDetails)

// //Route To Get A Particular Donation Details
// router.post("/get-full-donor-details", auth, isDonor, getFullDonorDetails)

// //Route To View Donor Details
// router.get("/view-donor-details", auth, isDonor, viewDetails)

// //Route To Delete Donor Details
// router.delete("/delete-donor-details", auth, isDonor, deleteDetails)

// module.exports = router

const express = require("express");
const router = express.Router();

const {
    addDonorDetails,
    viewRecepients,
    editDonorDetails,
    getFullDonorDetails,
    viewDetails,
    deleteDetails,
    getNearbyDonors,   
    viewSingleCardDetails
} = require("../controllers/Donor");

const { auth, isDonor } = require("../middlewares/auth");

// Route To Add Donor Details
router.post("/add-donor-details", auth, isDonor, addDonorDetails);

// Route To View Recepient Details
router.get("/view-recepients", auth, isDonor, viewRecepients);

// Route To Edit Donor Details
router.post("/edit-donor-details", auth, isDonor, editDonorDetails);

// Route To Get A Particular Donation Details
router.post("/get-full-donor-details", auth, isDonor, getFullDonorDetails);

// Route To View Donor Details
router.get("/view-donor-details", auth, isDonor, viewDetails);


router.post("/view-recepient-single-card-details", auth, isDonor, viewSingleCardDetails)

// Route To Delete Donor Details
router.delete("/delete-donor-details", auth, isDonor, deleteDetails);

// Route To Get Nearby Donors
router.post("/donors/nearby", auth, isDonor, getNearbyDonors);

module.exports = router;