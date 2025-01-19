const express = require("express")
const router = express.Router()

const {
    viewUser,
    approveUsers
} =require("../controllers/Admin")

const { auth,isAdmin } = require("../middlewares/auth")

// Route To View All Unverified Users
router.get("/view-user", auth, isAdmin, viewUser)

//Route To Approve A Verified User
router.post("/approve-users", auth, isAdmin, approveUsers)

module.exports = router