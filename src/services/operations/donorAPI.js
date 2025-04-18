import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { donorEndpoints } from "../apis"

const {
    ADD_DONOR_DETAILS_API,
    VIEW_RECEPIENTS_API,
    EDIT_DONOR_DETAILS_API,
    GET_FULL_DONOR_DETAILS_API,
    VIEW_DONOR_DETAILS_API,
    DELETE_DONOR_DETAILS_API,
    GET_SINGLE_RECEPIENT_CARD_DETAILS,
} = donorEndpoints

export const addDonorDetails = async (data, token, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", ADD_DONOR_DETAILS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("ADD DONOR DETAILS RESPONSE............", response)

        if (!response?.data?.success) {
            throw new Error("Could Not Add Donor Details")
        }
        toast.success("Donor Details Added Successfully")
        navigate("/dashboard/my-profile")
        result = response?.data?.donorDetails
    } catch (error) {

        console.log("ADD DONOR DETAILS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const viewRecepients = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", VIEW_RECEPIENTS_API, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Recepients")
        }
        console.log(
            "VIEW_RECEPIENTS_API API RESPONSE............",
            response
        )
        result = response?.data?.data?.allRecepients
    } catch (error) {
        console.log("VIEW_RECEPIENTS_API............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editDonorDetails = async (data, token, navigate) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_DONOR_DETAILS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT DONOR DETAILS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Donation Details")
        }
        toast.success("Donation Details Updated Successfully")
        navigate("/dashboard/my-profile")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT DONOR DETAILS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getFullDetailsOfDonor = async (donorId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_DONOR_DETAILS_API,
            {
                donorId
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET_FULL_DONOR_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_FULL_DONOR_DETAILS_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const viewDonorDetails = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", VIEW_DONOR_DETAILS_API, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Details")
        }
        console.log(
            "VIEW_DONOR_DETAILS_API API RESPONSE............",
            response
        )
        result = response?.data?.data
    } catch (error) {
        console.log("VIEW_DONOR_DETAILS_API............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteDonorDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_DONOR_DETAILS_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_DONOR_DETAILS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Details")
        }
        toast.success("Donor Details Deleted Successfully")
    } catch (error) {
        console.log("DELETE_DONOR_DETAILS_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}


export const getSingleCardDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    
    try {
        
        const response = await apiConnector("POST", GET_SINGLE_RECEPIENT_CARD_DETAILS, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_SINGLE_RECEPIENT_CARD_DETAILS_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Get Details")
        }       
        
        result = response?.data?.recepientDetails
                
    } catch (error) {
        console.log("GET_SINGLE_RECEPIENT_CARD_DETAILS_API ERROR............", error)
        console.log("first")
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}
// sejbfjevwhfwee