import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { recepientEndpoints } from "../apis"

const {
    VIEW_DONORS_API,
    ADD_RECEPIENT_DETAILS_API,
    EDIT_RECEPIENT_DETAILS_API,
    GET_FULL_RECEPIENT_DETAILS_API,
    VIEW_RECEPIENT_DETAILS_API,
    DELETE_RECEPIENT_DETAILS_API,
    GET_SINGLE_DONOR_CARD_DETAILS
} = recepientEndpoints

export const viewDonors = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", VIEW_DONORS_API, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Donors")
        }
        console.log(
            "VIEW_DONORS_API API RESPONSE............",
            response
        )
        result = response?.data?.data?.allDonors
    } catch (error) {
        console.log("VIEW_DONORS_API............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const addRecepientDetails = async (data, token, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", ADD_RECEPIENT_DETAILS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("ADD RECEPIENT DETAILS RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Add Recepient Details")
        }
        toast.success("Recepient Details Added Successfully")
        navigate("/dashboard/my-profile")
        result = response?.data?.recepientDetails
    } catch (error) {

        console.log("ADD RECEPIENT DETAILS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editRecepientDetails = async (data, token, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_RECEPIENT_DETAILS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT RECEPIENT DETAILS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Recepient Details")
        }
        toast.success("Recepient Details Updated Successfully")
        navigate("/dashboard/my-profile")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT RECEPIENT DETAILS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getFullDetailsOfRecepient = async (recepientId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_RECEPIENT_DETAILS_API,
            {
                recepientId
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET_FULL_RECEPIENT_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_FULL_RECEPIENT_DETAILS_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const viewRecepientDetails = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", VIEW_RECEPIENT_DETAILS_API, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Details")
        }
        console.log(
            "VIEW_RECEPIENT_DETAILS_API API RESPONSE............",
            response
        )
        result = response?.data?.data
    } catch (error) {
        console.log("VIEW_RECEPIENT_DETAILS_API............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteRecepientDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_RECEPIENT_DETAILS_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_RECEPIENT_DETAILS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Details")
        }
        toast.success("Recepient Details Deleted Successfully")
    } catch (error) {
        console.log("DELETE_RECEPIENT_DETAILS_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}


export const getSingleCardDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    
    try {
        
        const response = await apiConnector("POST", GET_SINGLE_DONOR_CARD_DETAILS, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_SINGLE_DONOR_CARD_DETAILS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Get Details")
        }       
        
        result = response?.data?.donorDetails
                
    } catch (error) {
        console.log("GET_SINGLE_DONOR_CARD_DETAILS_API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}