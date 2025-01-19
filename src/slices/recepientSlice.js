import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    recepient: null,
    editRecepient: false
}

const recepientSlice = createSlice({
    name: "recepient",
    initialState,
    reducers: {
        setRecepient: (state, action) => {
            state.recepient = action.payload
        },
        setEditRecepient: (state, action) => {
            state.editRecepient = action.payload
        },
        resetRecepientState: (state) => {
            state.recepient = null
            state.editRecepient = false
        }
    }
})

export const {
    setRecepient,
    setEditRecepient,
    resetRecepientState
} = recepientSlice.actions

export default recepientSlice.reducer