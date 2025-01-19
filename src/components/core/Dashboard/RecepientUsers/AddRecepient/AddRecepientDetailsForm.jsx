import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addRecepientDetails, editRecepientDetails } from "../../../../../services/operations/recepientAPI"
import { setRecepient } from '../../../../../slices/recepientSlice'
import { toast } from 'react-hot-toast'

function AddRecepientDetailsForm() {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { recepient, editRecepient } = useSelector((state) => state.recepient)
    const frequency = ["Daily", "Weekly", "Occasionally"]
    const type = ["Perishable", "Non-Perishable", "Cooked", "Raw Ingredients"]
    const delivery = ["PickUp", "Delivery"]
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        //Set To Previous Values If Editing
        if (editRecepient) {
            setValue("frequencyOfNeed", recepient.frequencyOfNeed)
            setValue("requestDescription", recepient.requestDescription)
            setValue("typeOfFood", recepient.typeOfFood)
            setValue("quantity", recepient.quantity)
            setValue("receivingOption", recepient.receivingOption)
            setValue("prefferedPickUpTime", recepient.prefferedPickUpTime)
        }
    }, [])

    //To Check Whether The Form Is Updated Or Not
    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.frequencyOfNeed !== recepient.frequencyOfNeed || currentValues.requestDescription !== recepient.requestDescription || currentValues.typeOfFood !== recepient.typeOfFood || currentValues.quantity !== recepient.quantity || currentValues.receivingOption !== recepient.receivingOption || currentValues.prefferedPickUpTime !== recepient.prefferedPickUpTime)
            return true
        else
            return false
    }

    // Handle Form Submission
    const onSubmit = async (data) => {
        if (editRecepient) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData()
                formData.append("recepientId", recepient._id)
                if (currentValues.frequencyOfNeed !== recepient.frequencyOfNeed)
                    formData.append("frequencyOfNeed", data.frequencyOfNeed)
                if (currentValues.requestDescription !== recepient.requestDescription)
                    formData.append("requestDescription", data.requestDescription)
                if (currentValues.typeOfFood !== recepient.typeOfFood)
                    formData.append("typeOfFood", data.typeOfFood)
                if (currentValues.quantity !== recepient.quantity)
                    formData.append("quantity", data.quantity)
                if (currentValues.receivingOption !== recepient.receivingOption)
                    formData.append("receivingOption", data.receivingOption)
                if (currentValues.prefferedPickUpTime !== recepient.prefferedPickUpTime)
                    formData.append("prefferedPickUpTime", data.prefferedPickUpTime)
                setLoading(true)
                const result = await editRecepientDetails(formData, token, navigate)
                setLoading(false)
                if (result) {
                    dispatch(setRecepient(result))
                }
            }
            else {
                toast.error("No Changes Made So Far")
            }
            return
        }

        // Creating New Request
        const formData = new FormData()
        formData.append("frequencyOfNeed", data.frequencyOfNeed)
        formData.append("requestDescription", data.requestDescription)
        formData.append("typeOfFood", data.typeOfFood)
        formData.append("quantity", data.quantity)
        formData.append("receivingOption", data.receivingOption)
        formData.append("prefferedPickUpTime", data.prefferedPickUpTime)
        setLoading(true)
        const result = await addRecepientDetails(formData, token, navigate)
        if (result) {
            dispatch(setRecepient(result))
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
                                Frequency Of Need <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <select
                            name="frequencyOfNeed"
                            id="frequencyOfNeed"
                            {...register("frequencyOfNeed", { required: true })}
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
                            errors.frequencyOfNeed && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                                Frequency Of Need Is Required**
                            </span>)
                        }

                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>
                            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-5">
                                Request Description <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <textarea
                            id='requestDescription'
                            placeholder='Enter Request Description'
                            name='requestDescription'
                            {...register("requestDescription", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full border-2 border-solid p-2 rounded-lg"
                        />
                        {errors.requestDescription && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                            Request Description Is Required**
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
                                Receiving Option <sup className="text-pink-500">*</sup>
                            </p>
                        </label>
                        <select
                            id="receivingOption"
                            name="receivingOption"
                            {...register("receivingOption", { required: true })}
                            className="form-style w-full border-2 border-solid p-2 rounded-lg"
                        >
                            <option value="" disabled selected>Select A Receiving Option</option>
                            {
                                !loading && delivery.map((del, index) => (
                                    <option key={index} value={del}>
                                        {del}
                                    </option>
                                ))
                            }

                        </select>
                        {
                            errors.receivingOption && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Receiving Option Is Required**
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
                            editRecepient && (
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
                            {!editRecepient ? "Save" : "Save Changes"}
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

export default AddRecepientDetailsForm