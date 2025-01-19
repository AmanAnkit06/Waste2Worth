import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Donor Or Recepient
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.DONOR)

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",    
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { name, phoneNo, email, password, confirmPassword } = formData

  // Handle Input Fields, When Some Value Changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting Signup Data To State
    // To Be Used After Otp Verification
    dispatch(setSignupData(signupData))
    // Send OTP To User For Verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      name: "",
      phoneNo: "",
      email: "",      
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.DONOR)
  }

  // Data To Pass To Tab Component
  const tabData = [
    {
      id: 1,
      tabName: "Donor",
      type: ACCOUNT_TYPE.DONOR,
    },
    {
      id: 2,
      tabName: "Recepient",
      type: ACCOUNT_TYPE.RECEPIENT,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-800">
              Name <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter Name"
              className="form-style w-full border-2 border-solid p-2 rounded-lg"
            />
          </label>
          <label>
            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-800">
              Phone No <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="phone"
              name="phoneNo"
              minLength="10"
              maxLength="10"
              pattern="\d{10}"
              title="Please Enter A Valid 10 Digit Phone No."
              value={phoneNo}
              onChange={handleOnChange}
              placeholder="Enter Phone No"
              className="form-style w-full border-2 border-solid p-2 rounded-lg"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-800">
            Email Address <sup className="text-pink-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email Address"
            className="form-style w-full border-2 border-solid p-2 rounded-lg"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-800">
              Create Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 border-2 border-solid p-2 rounded-lg"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.5rem] text-richblack-800">
              Confirm Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 border-2 border-solid p-2 rounded-lg"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm