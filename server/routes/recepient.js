const express = require("express")
const router = express.Router()

const {
    viewDonors,
    addRecepientDetails,
    editRecepientDetails,
    getFullRecepientDetails,
    viewRecepientDetails,
    deleteRecepientDetails
} = require("../controllers/Recepient")

const { auth, isRecepient } = require("../middlewares/auth")

//Route To View Donor Details
router.get("/view-donors", auth, isRecepient, viewDonors)

//Route To Add Recepient Details
router.post("/add-recepient-details", auth, isRecepient, addRecepientDetails)

//Route To Edit Recepient Details
router.post("/edit-recepient-details", auth, isRecepient, editRecepientDetails)

//Route To Get A Particular Recepient Details
router.post("/get-full-recepient-details", auth, isRecepient, getFullRecepientDetails)

//Route To View Recepient Details
router.get("/view-recepient-details", auth, isRecepient, viewRecepientDetails)

//Route To Delete Recepient Details
router.delete("/delete-recepient-details", auth, isRecepient, deleteRecepientDetails)

module.exports = router