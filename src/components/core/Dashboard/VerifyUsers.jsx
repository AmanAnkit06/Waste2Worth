import React from 'react'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UsersTable from './AdminUsers/UsersTable'
import { viewUser } from '../../../services/operations/adminAPI'
export default function MyTasks() {
    const { token } = useSelector((state) => state.auth)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await viewUser(token)            
            if (result) {
                setUsers(result)
            }
        }
        fetchUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-800">All Users</h1>
            </div>
            {users && <UsersTable users={users} setUsers={setUsers} />}
        </div>
    )
}