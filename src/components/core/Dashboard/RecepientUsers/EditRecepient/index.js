import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddRecepientDetailsForm from "../AddRecepient/AddRecepientDetailsForm"
import { getFullDetailsOfRecepient } from "../../../../../services/operations/recepientAPI"
import { setEditRecepient, setRecepient } from "../../../../../slices/recepientSlice"

export default function EditRecepientDetails() {
    const dispatch = useDispatch()
    const { recepientId } = useParams()
    const { recepient } = useSelector((state) => state.recepient)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)


    useEffect(() => {
        ; (async () => {

            //Fetching The Details Of Recepient For Editing
            setLoading(true)
            const result = await getFullDetailsOfRecepient(recepientId, token)
            if (result?.recepientDetails) {
                dispatch(setEditRecepient(true))
                dispatch(setRecepient(result?.recepientDetails))
            }
            setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-500">
                Edit Recepient Details
            </h1>
            <div className="mx-auto max-w-[600px]">
                {recepient ? (
                    <AddRecepientDetailsForm />
                ) : (
                    <p className="mt-14 text-center text-3xl font-semibold text-richblack-300">
                        Recepient Details Not Found
                    </p>
                )}
            </div>
        </div>
    )
}