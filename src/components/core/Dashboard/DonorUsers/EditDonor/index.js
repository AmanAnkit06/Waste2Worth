import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddDonorDetailsForm from "../AddDonor/AddDonorDetailsForm"
import { getFullDetailsOfDonor } from "../../../../../services/operations/donorAPI"
import { setEditDonation, setDonation } from "../../../../../slices/donationSlice"

export default function EditDonorDetails() {
    const dispatch = useDispatch()
    const { donorId } = useParams()
    const { donation } = useSelector((state) => state.donation)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)


    useEffect(() => {
        ; (async () => {

            //Fetching The Details Of Donation For Editing
            setLoading(true)
            const result = await getFullDetailsOfDonor(donorId, token)
            if (result?.donorDetails) {
                dispatch(setEditDonation(true))
                dispatch(setDonation(result?.donorDetails))
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
                Edit Donor Details
            </h1>
            <div className="mx-auto max-w-[600px]">
                {donation ? (
                    <AddDonorDetailsForm />
                ) : (
                    <p className="mt-14 text-center text-3xl font-semibold text-richblack-300">
                        Donor Details Not Found
                    </p>
                )}
            </div>
        </div>
    )
}