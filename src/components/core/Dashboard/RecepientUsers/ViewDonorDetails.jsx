import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { viewDonors } from '../../../../services/operations/recepientAPI';

const ViewDonorDetails = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [donors, setDonors] = useState(null);
  const navigate = useNavigate()

  //Fetching All Donors Who Has Created One Or More Donations 
  const getDonors = async () => {
    try {
      const response = await viewDonors(token);
      setDonors(response);
    }
    catch (error) {
      console.log("Unable To Fetch Donors");
    }
  }

  useEffect(() => {
    getDonors();
  }, []);

  return (
    <div>
      {
        //Checking For Approved Donors Having Created Earlier Donations
        (user?.approved === true && !donors?.length) ? (
          <p className="font-bold text-4xl text-center text-richblack-600">
            No Donors Has Registered Yet!
          </p>
        ) : (user?.approved === true && donors?.length) ? (
          <div>
            <div className="text-3xl text-richblack-800">All Donors</div>
            <div className="my-8 text-richblack-600">
              <div className="flex rounded-t-lg bg-richblack-50">
                <p className="w-[60%] px-5 py-3">Donor Details ( Tap On A Donor To View There Contact Detail )</p>
              </div>

              {donors.map((donor, i, arr) => (
                <div
                  className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                    }`}
                  key={i}
                >

                  <div
                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                    onClick={() => {
                      navigate(
                        `/view-donor`
                      )
                    }}
                  >

                    <div className="flex max-w-xl flex-col gap-2">
                      <p className="text-lg font-semibold">Donation Frequency: {donor.donationFrequency}</p>
                      <p className="text-sm font-medium text-richblack-500">
                        Donation Description: {donor.donationDescription.length > 50
                          ? `${donor.donationDescription.slice(0, 50)}...`
                          : donor.donationDescription}
                      </p>
                      <p className="text-sm font-medium text-richblack-500">
                        Type Of Food: {donor.typeOfFood}
                      </p>
                      <p className="text-sm font-medium text-richblack-500">
                        Quantity: {donor.quantity}
                      </p>
                      <p className="text-sm font-medium text-richblack-500">
                        Delivery Option: {donor.deliveryOption}
                      </p>
                      <p className="text-sm font-medium text-richblack-500">
                        Preffered Time: {donor.prefferedPickUpTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='text-brown-600 text-center font-bold text-4xl'>
            Please Wait Until Verification To Proceed!
          </div>
        )
      }
    </div>
  )
}

export default ViewDonorDetails