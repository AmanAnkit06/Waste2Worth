import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addDonorDetails, editDonorDetails } from "../../../../../services/operations/donorAPI"
import { setDonation } from '../../../../../slices/donationSlice'
import { toast } from 'react-hot-toast'

function AddDonorDetailsForm() {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { donation, editDonation } = useSelector((state) => state.donation)
    const frequency = ["Daily", "Weekly", "Occasionally"]
    const type = ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"]
    const delivery = ["PickUp", "Delivery"]
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        //Set To Previous Values If Editing
        if (editDonation) {
            setValue("donationFrequency", donation.donationFrequency)
            setValue("donationDescription", donation.donationDescription)
            setValue("typeOfFood", donation.typeOfFood)
            setValue("quantity", donation.quantity)
            setValue("deliveryOption", donation.deliveryOption)
            setValue("prefferedPickUpTime", donation.prefferedPickUpTime)
        }
    }, [])

    //To Check Whether The Form Is Updated Or Not
    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.donationFrequency !== donation.donationFrequency || currentValues.donationDescription !== donation.donationDescription || currentValues.typeOfFood !== donation.typeOfFood || currentValues.quantity !== donation.quantity || currentValues.deliveryOption !== donation.deliveryOption || currentValues.prefferedPickUpTime !== donation.prefferedPickUpTime)
            return true
        else
            return false
    }

    // Handle Form Submission
    const onSubmit = async (data) => {
        if (editDonation) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData()
                formData.append("donorId", donation._id)
                if (currentValues.donationFrequency !== donation.donationFrequency)
                    formData.append("donationFrequency", data.donationFrequency)
                if (currentValues.donationDescription !== donation.donationDescription)
                    formData.append("donationDescription", data.donationDescription)
                if (currentValues.typeOfFood !== donation.typeOfFood)
                    formData.append("typeOfFood", data.typeOfFood)
                if (currentValues.quantity !== donation.quantity)
                    formData.append("quantity", data.quantity)
                if (currentValues.deliveryOption !== donation.deliveryOption)
                    formData.append("deliveryOption", data.deliveryOption)
                if (currentValues.prefferedPickUpTime !== donation.prefferedPickUpTime)
                    formData.append("prefferedPickUpTime", data.prefferedPickUpTime)
                setLoading(true)
                const result = await editDonorDetails(formData, token, navigate)
                setLoading(false)
                if (result) {
                    dispatch(setDonation(result))
                }
            }
            else {
                toast.error("No Changes Made So Far")
            }
            return
        }

        // Creating New Donation
        const formData = new FormData()
        formData.append("donationFrequency", data.donationFrequency)
        formData.append("donationDescription", data.donationDescription)
        formData.append("typeOfFood", data.typeOfFood)
        formData.append("quantity", data.quantity)
        formData.append("deliveryOption", data.deliveryOption)
        formData.append("prefferedPickUpTime", data.prefferedPickUpTime)
        setLoading(true)
        const result = await addDonorDetails(formData, token, navigate)
        if (result) {
            dispatch(setDonation(result))
        }
        setLoading(false)
    }
    return (
        <div>

            {/* Allowing Only Approved Users To Update Details  */}
            {user?.approved === true ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" relative space-y-8 rounded-m border-richblack-700 bg-richblack-800 p-6"
                >
                    <div className="flex flex-col space-y-2">
                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Donation Frequency <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <select
                            name="donationFrequency"
                            id="donationFrequency"
                            {...register("donationFrequency", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        >
                            <option value="" disabled selected>Select A Frequency</option>
                            {
                                !loading && frequency.map((freq, index) => (
                                    <option key={index} value={freq}>
                                        {freq}
                                    </option>
                                ))
                            }

                        </select>
                        {
                            errors.donationFrequency && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                                Donation Frequency Is Required**
                            </span>)
                        }

                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Donation Description <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <textarea
                            id='donationDescription'
                            placeholder='Enter Donation Description'
                            name='donationDescription'
                            {...register("donationDescription", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full border-2 border-solid p-2 rounded-lg"
                        />
                        {errors.donationDescription && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                            Donation Description Is Required**
                        </span>)}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Type Of Food <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <select
                            id="typeOfFood"
                            name="typeOfFood"
                            {...register("typeOfFood", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        >
                            <option value="" disabled selected>Select The Type</option>
                            {
                                !loading && type.map((t, index) => (
                                    <option key={index} value={t}>
                                        {t}
                                    </option>
                                ))
                            }

                        </select>
                        {errors.typeOfFood && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Type Of Food Is Required**
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Quantity <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity" placeholder="Enter The Quantity Available With Units"
                            {...register("quantity", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        />
                        {
                            errors.quantity && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                                Quantity Is Required**
                            </span>)
                        }

                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Delivery Option <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <select
                            id="deliveryOption"
                            name="deliveryOption"
                            {...register("deliveryOption", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        >
                            <option value="" disabled selected>Select A Delivery Option</option>
                            {
                                !loading && delivery.map((del, index) => (
                                    <option key={index} value={del}>
                                        {del}
                                    </option>
                                ))
                            }

                        </select>
                        {
                            errors.deliveryOption && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Delivery Option Is Required**
                                </span>
                            )
                        }

                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Preffered Time <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <input
                            id="prefferedPickUpTime"
                            type="text"
                            name="prefferedPickUpTime"
                            placeholder="Enter Preffered Pick Up Time"
                            {...register("prefferedPickUpTime", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        />
                        {
                            errors.prefferedPickUpTime && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Preffered Pick-Up Time Is Required**
                                </span>
                            )
                        }
                    </div>

                    <div className="flex justify-end gap-x-2">
                        {
                            editDonation && (
                                <button disabled={loading}
                                    onClick={() => navigate("/dashboard/my-profile")}
                                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">Continue Without Saving</button>
                            )
                        }
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            {!editDonation ? "Save" : "Save Changes"}
                        </button>
                    </div>
                </form>

            ) : (
                <div className='text-brown-600 text-center font-bold text-4xl'>
                    Please Wait Until Verification To Proceed!
                </div>

            )
            }
        </div>
    )
}

export default AddDonorDetailsForm