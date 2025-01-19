import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    donation: null,
    editDonation: false
}

const donationSlice = createSlice({
    name: "donation",
    initialState,
    reducers: {
        setDonation: (state, action) => {
            state.donation = action.payload
        },
        setEditDonation: (state, action) => {
            state.editDonation = action.payload
        },
        resetDonationState: (state) => {
            state.donation = null
            state.editDonation = false
        }
    }
})

export const {
    setDonation,
    setEditDonation,
    resetDonationState
} = donationSlice.actions

export default donationSlice.reducer