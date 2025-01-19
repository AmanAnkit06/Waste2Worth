import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { viewRecepientDetails, deleteRecepientDetails } from '../../../../../services/operations/recepientAPI'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"
import ConfirmationModal from '../../../../common/ConfirmationModal'
import formatDate from '../../../../../services/formatDate'
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"

const ViewRequests = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    //To Get All Request Details Of The Recepient
    const getDetails = async () => {
        try {
            const response = await viewRecepientDetails(token);
            setDetails(response);
        }
        catch (error) {
            console.log("Unable To Fetch Details");
        }
    }

    //For Deleting A Particular Request Detail
    const handleDetailsDelete = async (recepientId) => {
        setLoading(true)
        await deleteRecepientDetails({ recepientId: recepientId }, token)
        const result = await viewRecepientDetails(token)
        if (result) {
            setDetails(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <>
            {
                //Checking For Approved Recepient Having Created Earlier Requests 
                (user?.approved === true && !details?.length) ? (
                    <p className="font-bold text-4xl text-center text-richblack-600">
                        No Details Added Yet!
                    </p>
                ) : (user?.approved === true && details?.length) ? (
                    <div>
                        <Table className="rounded-xl border border-richblack-800 ">
                            <Thead>
                                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                                    <Th className="flex-1 text-left text-lg font-semibold uppercase text-richblack-500">
                                        Details
                                    </Th>
                                    <Th className="flex flex-row gap-1 text-left text-lg font-semibold uppercase text-richblack-500">
                                        Created At <HiClock size={15} />
                                    </Th>
                                    <Th className="text-left text-lg font-semibold uppercase text-richblack-500">
                                        Action
                                    </Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {
                                    details?.map((d) => (
                                        <Tr
                                            key={d._id}
                                            className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                        >
                                            <Td className="flex flex-1">
                                                <div className="flex flex-col justify-between">
                                                    <p className="text-lg font-semibold text-richblack-500">
                                                        Frequency: {d.frequencyOfNeed}
                                                    </p>
                                                    <p className="text-sm font-medium text-richblack-300">
                                                        Type: {d.typeOfFood}
                                                    </p>
                                                    <p className="text-sm font-medium text-richblack-300">
                                                        Quantity: {d.quantity}
                                                    </p>
                                                    <p className="text-sm font-medium text-richblack-300">
                                                        Description: {d.requestDescription.split(" ").length >
                                                            10
                                                            ? d.requestDescription
                                                                .split(" ")
                                                                .slice(0, 10)
                                                                .join(" ") + "..."
                                                            : d.requestDescription}
                                                    </p>
                                                    <p className="text-sm font-medium text-richblack-300">
                                                        Receiving Option: {d.receivingOption}
                                                    </p>
                                                    <p className="text-sm font-medium text-richblack-300">
                                                        Preffered Time: {d.prefferedPickUpTime}
                                                    </p>
                                                </div>
                                            </Td>
                                            <Td>
                                                <p className="text-sm font-medium text-richblack-300">
                                                    {formatDate(d.createdAt)}
                                                </p>
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-300 ">
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        navigate(`/dashboard/edit-recepient-details/${d._id}`)
                                                    }}
                                                    title="Edit"
                                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <FiEdit2 size={20} />
                                                </button>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Do You Want To Delete This Request Detail?",
                                                            text2:
                                                                "All The Data Related To This Will Be Deleted",
                                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: !loading
                                                                ? () => handleDetailsDelete(d._id)
                                                                : () => { },
                                                            btn2Handler: !loading
                                                                ? () => setConfirmationModal(null)
                                                                : () => { },
                                                        })
                                                    }}
                                                    title="Delete"
                                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
                    </div>

                ) : (
                    <div className='text-brown-600 text-center font-bold text-4xl'>
                        Please Wait Until Verification To Proceed!
                    </div>
                )
            }
        </>
    )
}

export default ViewRequests