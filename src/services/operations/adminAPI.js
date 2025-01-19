import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { adminEndpoints } from "../apis"

const {
    VIEW_USER_API,
    APPROVE_USERS_API
} = adminEndpoints

export const viewUser = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", VIEW_USER_API, null,{
            Authorization: `Bearer ${token}`,
          })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch The Users")
        }
        console.log(
            "VIEW_USER_API API RESPONSE............",
            response
        )
        result = response?.data?.allUsers
    } catch (error) {
        console.log("VIEW_USER_API............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const approveUsers = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST", APPROVE_USERS_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log(
            "APPROVE_USERS_API API RESPONSE............",
            response
        )

        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("User Approved")
        result = true
    } catch (error) {
        console.log("APPROVE_USERS_API API ERROR............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}