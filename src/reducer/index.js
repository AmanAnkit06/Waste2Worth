import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import donationReducer from "../slices/donationSlice"
import recepientReducer from "../slices/recepientSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    donation: donationReducer,
    recepient: recepientReducer
})

export default rootReducer