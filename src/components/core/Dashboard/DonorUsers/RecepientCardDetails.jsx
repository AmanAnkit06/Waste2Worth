import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleCardDetails } from '../../../../services/operations/donorAPI'
import { useSelector } from 'react-redux'
import formatDate from "../../../../services/formatDate"

const RecepientCardDetails = () => {
  const { token } = useSelector(state => state.auth)
  const { recepientId } = useParams()
  const [recepient, setRecepient] = useState(null)

  useEffect(() => {
    const fetchRecepient = async () => {
      try {        
        const res = await getSingleCardDetails({recepientId:recepientId}, token)
        setRecepient(res)

      } catch (err) {
        console.error("Error Fetching Donor:", err)
      }
    }

    fetchRecepient()
  }, [recepientId, token])

  if (!recepient) return <p>Loading...</p>

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Donor Details</h2>
      {/* <p><strong>Name:</strong> {recepient.recepient.name}</p>
      <p><strong>Email:</strong> {recepient.recepient.email}</p>
      <p><strong>Contact No.:</strong> {recepient.recepient.phoneNo}</p>
      <p><strong>Address:</strong> {recepient.recepient.address.streetAddress}&nbsp;&nbsp;&nbsp;
         <strong>Pincode:</strong> {recepient.recepient.address.pincode}</p>
      <p><strong>Landmark:</strong> {recepient.recepient.address.landmark}</p>
      <p><strong>City:</strong> {recepient.recepient.address.city}&nbsp;&nbsp;&nbsp;
         <strong>State:</strong> {recepient.recepient.address.state}</p>
      <p><strong>Joined At:</strong> {formatDate(recepient.createdAt)}</p>
      <p><strong>Description:</strong> {recepient.donationDescription}</p>      
      <p><strong>Donation Frequency:</strong> {recepient.donationFrequency}</p>
      <p><strong>Delivery Option:</strong> {recepient.deliveryOption}</p>      
      <p><strong>Type of Food:</strong> {recepient.typeOfFood}</p>
      <p><strong>Quantity:</strong> {recepient.quantity}</p>      
      <p><strong>Preferred Pickup Time:</strong> {recepient.prefferedPickUpTime}</p>      
      {/* <p><strong>Location:</strong> {recepient.latitude}, {recepient.longitude}</p> */}
      /* <p><strong>Rating:</strong> {recepient.rating}</p> */ 
    </div>
  )
}

export default RecepientCardDetails