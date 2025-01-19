import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/settingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function EditAddress() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data, navigate))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Profile Information */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-400 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-50">
                        Profile Information
                    </h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="name" className="lable-style">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter The Name"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                {...register("name", { required: true })}
                                defaultValue={user?.name}
                            />
                            {errors.name && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your Name**
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="phoneNo" className="lable-style">
                                Phone No
                            </label>
                            <input
                                type="phone"
                                name="phoneNo"
                                id="phoneNo"
                                minLength="10"
                                maxLength="10"
                                pattern="\d{10}"
                                title="Please Enter A Valid 10 Digit Phone No."
                                placeholder="Enter The Phone No."
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                {...register("phoneNo", { required: true })}
                                defaultValue={user?.phoneNo}
                            />
                            {errors.phoneNo && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your Phone No**
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="city" className="lable-style">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                placeholder="Enter The City"
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Your City",
                                    }
                                })}
                                defaultValue={user?.address?.city}
                            />
                            {errors.city && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.city.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="state" className="lable-style">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                placeholder="Enter The State"
                                {...register("state", { required: true })}
                                defaultValue={user?.address?.state}
                            />
                            {errors.state && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your State**
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="pincode" className="lable-style">
                                Pincode
                            </label>
                            <input
                                type="phone"
                                name="pincode"
                                id="pincode"
                                placeholder="Enter The Pincode"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                title="Please Enter A Valid 6 Digit Pincode"
                                {...register("pincode", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Your Pincode**",
                                    },
                                    maxLength: { value: 6, message: "Invalid Pincode" },
                                    minLength: { value: 6, message: "Invalid Pincode" },
                                })}
                                defaultValue={user?.address?.pincode}
                            />
                            {errors.pincode && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.pincode.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="landmark" className="lable-style">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                id="landmark"
                                placeholder="Enter The Landmark"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                {...register("landmark", { required: true })}
                                defaultValue={user?.address?.landmark}
                            />
                            {errors.landmark && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter Your Landmark**
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row justify-center">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="streetAddress" className="lable-style text-center">
                                Street Address
                            </label>
                            <textarea
                                name="streetAddress"
                                id="streetAddress"
                                cols="20"
                                rows="5"
                                placeholder="Enter The First Line Of Address"
                                className="form-style w-full border-2 border-solid p-2 rounded-lg"
                                title="Please Enter The Street Address Between 10-50 Characters"
                                {...register("streetAddress", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Your Street Address**",
                                    },
                                    maxLength: { value: 50, message: "Max Length Exceeded" },
                                    minLength: { value: 10, message: "Min Length Not Reached" },
                                })}
                                defaultValue={user?.address?.streetAddress}
                            />
                            {errors.streetAddress && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.streetAddress.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}