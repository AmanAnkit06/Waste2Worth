import React from 'react'
import { useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"

import ConfirmationModal from '../../../common/ConfirmationModal';
import { approveUsers, viewUser } from '../../../../services/operations/adminAPI';
export default function TasksTable({ users, setUsers }) {

    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleApproval = async (email) => {
        setLoading(true);
        await approveUsers({ email: email }, token)
        const result = await viewUser(token)
        if (result) {
            setUsers(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-300">
                            User
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-300">
                            Email
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-300">
                            Action
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-300">
                                No User Found
                            </Td>
                        </Tr>
                    ) : (
                        users?.map((user) => (
                            <Tr
                                key={user._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                            >
                                <Td className="flex flex-1 gap-x-4">
                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-richblack-500">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-richblack-300">
                                            {user.phoneNo}
                                        </p>
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-richblack-300">
                                    {user.email}
                                </Td>
                                <Td className="text-sm font-medium text-richblack-300 ">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do You Want To Approve This User?",
                                                text2:
                                                    "This Will Allow Them To Perform Operations",
                                                btn1Text: !loading ? "Approve" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleApproval(user.email)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            })
                                        }}
                                        title="Approve"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}