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


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { viewDonorDetails } from '../../../../services/operations/donorAPI'

export default function Donarscarddetails( ) {
    const dispatch=useDispatch()
    const {donarId}=useParams()
    const {donar}=useSelector((state)=>state.donar)
    const[loading,setLoading]=useState(false)
    const{token}=useSelector((state)=>state.auth)
     
    useEffect(()=>{
            ; (async () => {
    
                //Fetching The Details Of Recepient For Editing
                setLoading(true)
                const result = await viewDonorDetails(donorId, token)
                if (result?.donarDetails) {
                 
                    dispatch(setRecepient(result?.recepientDetails))
                }
                setLoading(false)
            })()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

}