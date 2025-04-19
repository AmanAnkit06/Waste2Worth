// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { viewRecepients } from '../../../../services/operations/donorAPI';

// const ViewRecepientDetails = () => {

//     const { token } = useSelector((state) => state.auth)
//     const { user } = useSelector((state) => state.profile)
//     const [recepients, setRecepients] = useState(null);
//     const navigate = useNavigate()

//     //Fetching All Recepients Who Has Made One Or More Requests
//     const getRecepients = async () => {
//         try {
//             const response = await viewRecepients(token);
//             setRecepients(response);
//         }
//         catch (error) {
//             console.log("Unable To Fetch Recepients");
//         }
//     }

//     useEffect(() => {
//         getRecepients();
//     }, []);

//     return (
//         <div>
//             {
//                 //Checking For Approved Recepients Having Created Earlier Requests
//                 (user?.approved === true && !recepients?.length) ? (
//                     <p className="font-bold text-4xl text-center text-richblack-600">
//                         No Recepients Has Registered Yet!
//                     </p>
//                 ) : (user?.approved === true && recepients?.length) ? (
//                     <div>
//                         <div className="text-3xl text-richblack-800">All Recepients</div>
//                         <div className="my-8 text-richblack-600">
//                             <div className="flex rounded-t-lg bg-richblack-50">
//                                 <p className="w-[60%] px-5 py-3">Recepient Details ( Tap On A Recepient To View There Contact Details )</p>
//                             </div>

//                             {recepients.map((recepient, i, arr) => (
//                                 <div
//                                     className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//                                         }`}
//                                     key={i}
//                                 >

//                                     <div
//                                         className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                                         onClick={() => {
//                                             navigate(
//                                                 `/view-recepient`
//                                             )
//                                         }}
//                                     >

//                                         <div className="flex max-w-xl flex-col gap-2">
//                                             <p className="text-lg font-semibold">Frequency Of Need: {recepient.frequencyOfNeed}</p>
//                                             <p className="text-sm font-medium text-richblack-500">
//                                                 Request Description: {recepient.requestDescription.length > 50
//                                                     ? `${recepient.requestDescription.slice(0, 50)}...`
//                                                     : recepient.requestDescription}
//                                             </p>
//                                             <p className="text-sm font-medium text-richblack-500">
//                                                 Type Of Food: {recepient.typeOfFood}
//                                             </p>
//                                             <p className="text-sm font-medium text-richblack-500">
//                                                 Quantity: {recepient.quantity}
//                                             </p>
//                                             <p className="text-sm font-medium text-richblack-500">
//                                                 Receiving Option: {recepient.receivingOption}
//                                             </p>
//                                             <p className="text-sm font-medium text-richblack-500">
//                                                 Preffered Time: {recepient.prefferedPickUpTime}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className='text-brown-600 text-center font-bold text-4xl'>
//                         Please Wait Until Verification To Proceed!
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default ViewRecepientDetails

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { viewRecepients } from "../../../../services/operations/donorAPI";

// const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//   const R = 6371 // Radius of the earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180)
//   const dLon = (lon2 - lon1) * (Math.PI / 180)
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2)
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   return R * c
// }


// const ViewRecepientDetails = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const [recepients, setRecepients] = useState(null);
// const [filteredRecepients, setFilteredRecepints] = useState([])
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");

//   const [selectedDelivery, setSelectedDelivery] = useState("");
//   const [selectedFoodType, setSelectedFoodType] = useState("");
//   const navigate = useNavigate();

//   const getRecepients = async () => {
//     try {
//       const response = await viewRecepients(token);
//       setRecepients(response);
//     } catch (error) {
//       console.log("Unable To Fetch Recepients");
//     }
//   };

//   useEffect(() => {
//     getRecepients();
//   }, []);


//   const handleFilter = () => {
//     const latitude = parseFloat(lat)
//     const longitude = parseFloat(lng)

//     const filtered = recepients.filter(recepient => {
//       if (!recepient.latitude || !recepient.longitude) return false

//       const dist = (!isNaN(latitude) && !isNaN(longitude))
//         ? getDistanceFromLatLonInKm(latitude, longitude, recepient.latitude, recepient.longitude)
//         : null

//       const withinDistance = dist === null || dist <= 5
//       const matchesDelivery = selectedDelivery === '' || recepient.deliveryOption === selectedDelivery
//       const matchesFoodType = selectedFoodType === '' || recepient.typeOfFood === selectedFoodType

//       return withinDistance && matchesDelivery && matchesFoodType
//     })

//     setFilteredRecepints(filtered)
//   }


//   return (
//     <div className="min-h-screen bg-[#fefce8] text-[#1f2937] py-10 px-4 sm:px-10">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-10 text-[#111827]">
//           All Recipients
//         </h2>

//         {user?.approved === true && !recepients?.length ? (
//           <p className="text-center text-xl text-gray-500 mt-10">
//             No Recipients Have Registered Yet!
//           </p>
//         ) : user?.approved === true && recepients?.length ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {recepients.map((recepient, i) => (
//               <div
//                 key={i}
//                 onClick={() =>
//                   navigate(
//                     `/dashboard/view-recepient-single-card-details/${recepient._id}`
//                   )
//                 }
//                 className="bg-[#f0f4f8] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-[#d1d5db] cursor-pointer"
//               >
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-[#1f2937] mb-1">
//                     Recipient #{i + 1}
//                   </h3>
//                   <div className="text-sm text-gray-500">
//                     Created on: {new Date().toLocaleDateString()}
//                   </div>
//                 </div>

//                 {/* Filter Inputs */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                   <input
//                     type="number"
//                     placeholder="Enter Latitude"
//                     value={lat}
//                     onChange={(e) => setLat(e.target.value)}
//                     className="p-3 border border-gray-300 rounded-md w-full"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Enter Longitude"
//                     value={lng}
//                     onChange={(e) => setLng(e.target.value)}
//                     className="p-3 border border-gray-300 rounded-md w-full"
//                   />
//                   <select
//                     value={selectedDelivery}
//                     onChange={(e) => setSelectedDelivery(e.target.value)}
//                     className="p-3 border border-gray-300 rounded-md w-full"
//                   >
//                     <option value="">All Delivery Options</option>
//                     <option value="PickUp">Pickup</option>
//                     <option value="Delivery">Delivery</option>
//                   </select>
//                   <select
//                     value={selectedFoodType}
//                     onChange={(e) => setSelectedFoodType(e.target.value)}
//                     className="p-3 border border-gray-300 rounded-md w-full"
//                   >
//                     <option value="">All Food Types</option>
//                     <option value="Perishable">Perishable</option>
//                     <option value="Non-Perishable">Non-Perishable</option>
//                     <option value="Cooked">Cooked</option>
//                     <option value="Raw Ingredients">Raw Ingredients</option>
//                   </select>
//                   <button
//                     onClick={handleFilter}
//                     className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 w-full"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>

//                 <div className="space-y-3 text-sm">
//                   {[
//                     {
//                       label: "Frequency of Need",
//                       value: recepient.frequencyOfNeed,
//                     },
//                     { label: "Type Of Food", value: recepient.typeOfFood },
//                     { label: "Quantity", value: recepient.quantity },
//                     {
//                       label: "Receiving Option",
//                       value: recepient.receivingOption,
//                     },
//                     {
//                       label: "Preferred Time",
//                       value: recepient.prefferedPickUpTime,
//                     },
//                     { label: "Phone Number", value: recepient.phonenumber },
//                     { label: "Latitude", value: recepient.latitude },
//                     { label: "Longitude", value: recepient.longitude },
//                   ].map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="border border-[#d1d5db] bg-[#f0f4f8] rounded-md p-3 flex justify-between items-center"
//                     >
//                       <span className="text-gray-600">{item.label}:</span>
//                       <span className="text-[#1f2937] font-medium">
//                         {item.value}
//                       </span>
//                     </div>
//                   ))}

//                   <div className="border border-[#d1d5db] bg-[#f0f4f8] rounded-md p-3">
//                     <span className="text-gray-600 block mb-1">
//                       Request Description:
//                     </span>
//                     <p className="text-[#1f2937]">
//                       {recepient.requestDescription.length > 100
//                         ? recepient.requestDescription.slice(0, 100) + "..."
//                         : recepient.requestDescription}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center font-bold text-xl text-orange-500 mt-20">
//             Please Wait Until Verification To Proceed!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewRecepientDetails;



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewRecepients } from "../../../../services/operations/donorAPI";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const ViewRecepientDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [recepients, setRecepients] = useState([]);
  const [filteredRecepients, setFilteredRecepients] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const navigate = useNavigate();

  const getRecepients = async () => {
    try {
      const response = await viewRecepients(token);
      setRecepients(response);
      setFilteredRecepients(response);
    } catch (error) {
      console.log("Unable To Fetch Recepients");
    }
  };

  useEffect(() => {
    getRecepients();
  }, []);

  const handleFilter = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const filtered = recepients.filter((recepient) => {
      if (!recepient.latitude || !recepient.longitude) return false;

      const dist =
        !isNaN(latitude) && !isNaN(longitude)
          ? getDistanceFromLatLonInKm(
              latitude,
              longitude,
              recepient.latitude,
              recepient.longitude
            )
          : null;

      const withinDistance = dist === null || dist <= 5;
      const matchesDelivery =
        selectedDelivery === "" ||
        recepient.receivingOption === selectedDelivery;
      const matchesFoodType =
        selectedFoodType === "" || recepient.typeOfFood === selectedFoodType;

      return withinDistance && matchesDelivery && matchesFoodType;
    });

    setFilteredRecepients(filtered);
  };

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      {user?.approved !== true ? (
        <div className="text-brown-600 text-center font-bold text-4xl">
          Please Wait Until Verification To Proceed!
        </div>
      ) : recepients?.length === 0 ? (
        <p className="font-bold text-4xl text-center text-gray-600">
          No Recepients Have Registered Yet!
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            All Recepients (Tap On A Card To View Contact Details)
          </h1>

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
              <option value="">All Receiving Options</option>
              <option value="PickUp">PickUp</option>
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

          {/* Recepient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecepients.map((recepient, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/dashboard/view-recepient-single-card-details/${recepient._id}`)
                }
                className="cursor-pointer bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {recepient.frequencyOfNeed} Request
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Description:</strong>{" "}
                  {recepient.requestDescription.length > 70
                    ? `${recepient.requestDescription.slice(0, 70)}...`
                    : recepient.requestDescription}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Food Type:</strong> {recepient.typeOfFood}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {recepient.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Receiving Option:</strong> {recepient.receivingOption}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Preferred Time:</strong>{" "}
                  {recepient.prefferedPickUpTime}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Latitude:</strong> {recepient.latitude}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Longitude:</strong> {recepient.longitude}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecepientDetails;
