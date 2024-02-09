import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AuthContext, AuthUser } from '../context/AuthContext'
import { useAuth } from '../components/hooks/useAuth'
import customFetch from '../utils/axios'
import { toast } from 'react-toastify'
import UserList from '../components/UserList'

// link to register user page - done
// get list of users
// delete user
// reset password = edit user's password
// only admins can access this page

export default function Admin() {
  const { state } = useContext(AuthContext)
  const { protectedRoute } = useAuth()
  const [users, setUsers] = useState<AuthUser[]>([])

  // auth protection
  protectedRoute()

  const getAllUsers = async () => {
    try {
      const response = await customFetch.get('api/v1/auth/get-all-users')
      setUsers(response.data.users)
      console.log(response)
    } catch (error) {
      const errMsg = error.response.data
        ? error.response.data.msg
        : error.message
      console.log('Error: ', errMsg)
      toast.error(errMsg)
    }
  }
  console.log(users)
  if (!state.user || (state.user && state.user.role !== 'admin')) return <></>
  return (
    <>
      <br />
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        <Link href={'/register'}>Register New User</Link>
      </button>
      <br />
      <br />
      <button
        onClick={getAllUsers}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Get All Users
      </button>
      <br />
      <br />
      <UserList users={users} />
    </>
  )
}
