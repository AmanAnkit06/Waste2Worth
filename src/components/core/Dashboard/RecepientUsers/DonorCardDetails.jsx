import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleCardDetails } from '../../../../services/operations/recepientAPI'
import { useSelector } from 'react-redux'
import formatDate from "../../../../services/formatDate"

const DonorCardDetails = () => {
  const { token } = useSelector(state => state.auth)
  const { donorId } = useParams()
  const [donor, setDonor] = useState(null)

  useEffect(() => {
    const fetchDonor = async () => {
      try {        
        const res = await getSingleCardDetails({donorId:donorId}, token)
        setDonor(res)

      } catch (err) {
        console.error("Error Fetching Donor:", err)
      }
    }

    fetchDonor()
  }, [donorId, token])

  if (!donor) return <p>Loading...</p>

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Donor Details</h2>
      <p><strong>Name:</strong> {donor.donor.name}</p>
      <p><strong>Email:</strong> {donor.donor.email}</p>
      <p><strong>Contact No.:</strong> {donor.donor.phoneNo}</p>
      <p><strong>Address:</strong> {donor.donor.address.streetAddress}&nbsp;&nbsp;&nbsp;
         <strong>Pincode:</strong> {donor.donor.address.pincode}</p>
      <p><strong>Landmark:</strong> {donor.donor.address.landmark}</p>
      <p><strong>City:</strong> {donor.donor.address.city}&nbsp;&nbsp;&nbsp;
         <strong>State:</strong> {donor.donor.address.state}</p>
      <p><strong>Joined At:</strong> {formatDate(donor.createdAt)}</p>
      <p><strong>Description:</strong> {donor.donationDescription}</p>      
      <p><strong>Donation Frequency:</strong> {donor.donationFrequency}</p>
      <p><strong>Delivery Option:</strong> {donor.deliveryOption}</p>      
      <p><strong>Type of Food:</strong> {donor.typeOfFood}</p>
      <p><strong>Quantity:</strong> {donor.quantity}</p>      
      <p><strong>Preferred Pickup Time:</strong> {donor.prefferedPickUpTime}</p>      
      <p><strong>Location:</strong> {donor.latitude}, {donor.longitude}</p>
      <p><strong>Rating:</strong> {donor.rating}</p>
    </div>
  )
}

export default DonorCardDetails