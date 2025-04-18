import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { apiConnector } from '../../../services/apiConnector';
import { contactUsEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/CountryCode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        try {
            setLoading(true);
            const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API, data);
            setLoading(false);
        }
        catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-10'>
                <div className='flex gap-5'>
                    {/* firstName */}
                    <div className='flex flex-col text-richblack-500'>
                        <label htmlFor='firstname'>First Name</label>
                        <input
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter First Name'
                            className='text-black form-style w-full border-2 border-solid p-2 rounded-lg'
                            {...register("firstname", { required: true })}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please Enter Your Name
                                </span>
                            )
                        }
                    </div>

                    {/* lastName */}
                    <div className='flex flex-col text-richblack-500'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            type='text'
                            name='lastname'
                            id='lastname'
                            className='text-black form-style w-full border-2 border-solid p-2 rounded-lg'
                            placeholder='Enter Last Name'
                            {...register("lastname")}
                        />

                    </div>

                </div>


                {/* email */}
                <div className='flex flex-col text-richblack-500'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='text-black form-style w-full border-2 border-solid p-2 rounded-lg'
                        placeholder='Enter Email Address'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                Please Enter Your Email Address
                            </span>
                        )
                    }
                </div>

                {/* phoneNo */}
                <div className='flex flex-col text-richblack-500'>

                    <label htmlFor='phonenumber'>Phone Number</label>

                    <div className='flex flex-row gap-1'>
                        {/* dropdown */}

                        <select
                            name='dropdown'
                            id="dropdown"
                            className='bg-yellow-50 w-[100px] form-style border-2 border-solid p-2 rounded-lg'
                            {...register("countrycode", { required: true })}
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-black  w-[calc(100%-100px)] form-style border-2 border-solid p-2 rounded-lg'
                            {...register("phoneNo",
                                {
                                    required: { value: true, message: "Please Enter Phone Number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone Number" }
                                })}
                        />

                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }

                </div>

                {/* message */}
                <div className='flex flex-col text-richblack-500'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        className='text-black form-style w-full border-2 border-solid p-2 rounded-lg'
                        rows="7"
                        placeholder='Enter Your Message Here'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span>
                                PLease Enter Your Message.
                            </span>
                        )
                    }
                </div>

                <button type='submit'
                    className='rounded-md bg-yellow-50 text-center p-2 text-[16px] font-bold text-black mb-5'>
                    Send Message
                </button>
            </div>

        </form>
    )
}

export default ContactUsForm