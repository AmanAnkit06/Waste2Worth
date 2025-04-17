// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { viewDonors } from '../../../../services/operations/recepientAPI';

// const ViewDonorDetails = () => {

//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const [donors, setDonors] = useState(null);
//   const navigate = useNavigate()

//   //Fetching All Donors Who Has Created One Or More Donations 
//   const getDonors = async () => {
//     try {
//       const response = await viewDonors(token);
//       setDonors(response);
//       console.log("receipent filetr",response)
//     }
//     catch (error) {
//       console.log("Unable To Fetch Donors");
//     }
//   }

//   useEffect(() => {
//     getDonors();
//   }, []);

//   return (
//     <div>
//       {
//         //Checking For Approved Donors Having Created Earlier Donations
//         (user?.approved === true && !donors?.length) ? (
//           <p className="font-bold text-4xl text-center text-richblack-600">
//             No Donors Has Registered Yet!
//           </p>
//         ) : (user?.approved === true && donors?.length) ? (
//           <div>
//             <div className="text-3xl text-richblack-800">All Donors</div>
//             <div className="my-8 text-richblack-600">
//               <div className="flex rounded-t-lg bg-richblack-50">
//                 <p className="w-[60%] px-5 py-3">Donor Details ( Tap On A Donor To View There Contact Detail )</p>
//               </div>

//               {donors.map((donor, i, arr) => (
//                 <div
//                   className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//                     }`}
//                   key={i}
//                 >

//                   <div
//                     className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                     onClick={() => {
//                       navigate(
//                         `/view-donor`
//                       )
//                     }}
//                   >

//                     <div className="flex max-w-xl flex-col gap-2">
//                       <p className="text-lg font-semibold">Donation Frequency: {donor.donationFrequency}</p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Donation Description: {donor.donationDescription.length > 50
//                           ? `${donor.donationDescription.slice(0, 50)}...`
//                           : donor.donationDescription}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Type Of Food: {donor.typeOfFood}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Quantity: {donor.quantity}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Delivery Option: {donor.deliveryOption}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Preffered Time: {donor.prefferedPickUpTime}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Latitude: {donor.latitude}
//                       </p>
//                       <p className="text-sm font-medium text-richblack-500">
//                         Longitutde: {donor.longitude}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className='text-brown-600 text-center font-bold text-4xl'>
//             Please Wait Until Verification To Proceed!
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default ViewDonorDetails

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { viewDonors } from '../../../../services/operations/recepientAPI'

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const ViewDonorDetails = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [donors, setDonors] = useState([])
  const [filteredDonors, setFilteredDonors] = useState([])
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [selectedDelivery, setSelectedDelivery] = useState('')
  const [selectedFoodType, setSelectedFoodType] = useState('')
  const navigate = useNavigate()

  const getDonors = async () => {
    try {
      const response = await viewDonors(token)
      setDonors(response)
      setFilteredDonors(response)
    } catch (error) {
      console.log("Unable To Fetch Donors")
    }
  }

  useEffect(() => {
    getDonors()
  }, [])

  const handleFilter = () => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    const filtered = donors.filter(donor => {
      if (!donor.latitude || !donor.longitude) return false

      const dist = (!isNaN(latitude) && !isNaN(longitude))
        ? getDistanceFromLatLonInKm(latitude, longitude, donor.latitude, donor.longitude)
        : null

      const withinDistance = dist === null || dist <= 5
      const matchesDelivery = selectedDelivery === '' || donor.deliveryOption === selectedDelivery
      const matchesFoodType = selectedFoodType === '' || donor.typeOfFood === selectedFoodType

      return withinDistance && matchesDelivery && matchesFoodType
    })

    setFilteredDonors(filtered)
  }

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      {
        user?.approved !== true ? (
          <div className="text-brown-600 text-center font-bold text-4xl">
            Please Wait Until Verification To Proceed!
          </div>
        ) : donors?.length === 0 ? (
          <p className="font-bold text-4xl text-center text-gray-600">
            No Donors Have Registered Yet!
          </p>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">All Donors (Tap On A Card To View Contact Details)</h1>

            {/* Filter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <input
                type="number"
                placeholder="Enter Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="number"
                placeholder="Enter Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <select
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
              >
                <option value="">All Delivery Options</option>
                <option value="PickUp">Pickup</option>
                <option value="Delivery">Delivery</option>
              </select>
              <select
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
              >
                <option value="">All Food Types</option>
                <option value="Perishable">Perishable</option>
                <option value="Non-Perishable">Non-Perishable</option>
                <option value="Cooked">Cooked</option>
                <option value="Raw Ingredients">Raw Ingredients</option>
              </select>
              <button
                onClick={handleFilter}
                className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 w-full"
              >
                Apply Filters
              </button>
            </div>

            {/* Donor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/dashboard/view-donor-single-card-details/${donor._id}`)}
                 

                  className="cursor-pointer bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-all"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {donor.donationFrequency} Donation
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Description:</strong> {donor.donationDescription.length > 70
                      ? `${donor.donationDescription.slice(0, 70)}...`
                      : donor.donationDescription}
                  </p>
                  <p className="text-sm text-gray-600"><strong>Food Type:</strong> {donor.typeOfFood}</p>
                  <p className="text-sm text-gray-600"><strong>Quantity:</strong> {donor.quantity}</p>
                  <p className="text-sm text-gray-600"><strong>Delivery:</strong> {donor.deliveryOption}</p>
                  <p className="text-sm text-gray-600"><strong>Preferred Time:</strong> {donor.prefferedPickUpTime}</p>
                  <p className="text-sm text-gray-600"><strong>Latitude:</strong> {donor.latitude}</p>
                  <p className="text-sm text-gray-600"><strong>Longitude:</strong> {donor.longitude}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ViewDonorDetails
