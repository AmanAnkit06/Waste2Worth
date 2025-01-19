import AddRecepientDetailsForm from "../AddRecepient/AddRecepientDetailsForm"
import { useNavigate } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi"

export default function AddRecepientDetails() {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex w-full items-start gap-x-6 ">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row justify-between items-baseline">
                        <h1 className="mb-14 text-3xl font-medium text-richblack-500">
                            Add Recepient Details
                        </h1>
                        <button onClick={() => navigate("/dashboard/edit-recepient-details")} className="bg-yellow-50 h-12 px-2 py-2 rounded-md cursor-pointer font-semibold flex flex-row gap-1">Edit Previous Details <FiEdit2 /></button>
                    </div>
                    <div className="flex-1">
                        <AddRecepientDetailsForm />
                    </div>
                </div>
            </div>
        </>
    )
}