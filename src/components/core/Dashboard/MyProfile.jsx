import { RiEditBoxLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { resetDonationState } from "../../../slices/donationSlice"
import { resetRecepientState } from "../../../slices/recepientSlice"
import { useEffect } from "react"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //To Reset Slice State
  const resetState = async () => {
    dispatch(resetDonationState())
    dispatch(resetRecepientState())
  }

  useEffect(() => {
    resetState()
  }, [])

  return (
    <>
      <h1 className="mb-6 text-4xl font-semibold text-richblack-800">
        My Profile
      </h1>
      <h2 className="mb-12 text-3xl font-medium text-richblack-500">
        Hi {user?.accountType} 👋
      </h2>

      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.name}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.name}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.name}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Address</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.address?.streetAddress ?? "Add Street Address"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}