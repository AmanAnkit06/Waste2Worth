// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import axios from "axios"

// const Donarcarddetails = () => {
//   const { donorId } = useParams()
//   const [donor, setDonor] = useState(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchDonorDetails = async () => {
//       setLoading(true)
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/donor/view-donor-details/${donorId}`)
//         if (response.data?.donorDetails) {
//           setDonor(response.data.donorDetails)
//         }
//       } catch (error) {
//         console.error("Error fetching donor details:", error)
//       }
//       setLoading(false)
//     }

//     fetchDonorDetails()
//   }, [donorId])

//   if (loading) {
//     return (
//       <div className="grid h-screen place-items-center">
//         <div className="spinner">Loading...</div>
//       </div>
//     )
//   }

//   if (!donor) {
//     return (
//       <div className="text-center mt-10 text-2xl text-gray-600">
//         Donor details not found.
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
//       <h1 className="text-2xl font-bold mb-4">{donor.name}</h1>
//       <p className="mb-2"><strong>Food Type:</strong> {donor.foodType}</p>
//       <p className="mb-2"><strong>Quantity:</strong> {donor.quantity}</p>
//       <p className="mb-2"><strong>Email:</strong> {donor.email}</p>
//       <p className="mb-2">
//         <strong>Phone:</strong>{" "}
//         <a href={`tel:${donor.phone}`} className="text-blue-600 underline">
//           {donor.phone}
//         </a>
//       </p>
//       {donor.location && (
//         <p className="mb-2">
//           <strong>Location:</strong> {donor.location.latitude}, {donor.location.longitude}
//         </p>
//       )}
//     </div>
//   )
// }

// export default Donarcarddetails

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { viewDonorDetails } from '../../../../services/operations/donorAPI'
// import DonarscarddetailsWrapper from './DonarscarddetailsWrapper'

// export default function Donarscarddetails( ) {
//     const dispatch=useDispatch()
//     const {donorId}=useParams()
//     const {donor}=useSelector((state)=>state.donor)
//     const[loading,setLoading]=useState(false)
//     const{token}=useSelector((state)=>state.auth)
     
//     useEffect(()=>{
//             ; (async () => {
    
//                 //Fetching The Details Of Recepient For Editing
//                 setLoading(true)
//                 const result = await viewDonorDetails(donorId, token)
//                 console.log("card result",result)
//                 setLoading(false)
//             })()
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, [])
//         if(loading){
//             return(
//                 <div className="grid flex-1 place-items-center">
//                     <div className="spinner"></div>
//                 </div>
//             )
//         }
//         return(
//             <div>
// <h1 className="mb-14 text-3xl font-medium text-richblack-500">  
//                 Edit Recepient Details
//             </h1>
//             <div className="mx-auto max-w-[600px]">
//                 {donor ? (
//                     <DonarscarddetailsWrapper />
//                 ) : (
//                     <p className="mt-14 text-center text-3xl font-semibold text-richblack-300">
//                        sdfghjk
//                     </p>
//                 )}
//             </div>
//                 </div>
//         )

// }

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