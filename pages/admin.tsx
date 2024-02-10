import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useAuth } from '../components/hooks/useAuth'
import customFetch from '../utils/axios'
import { toast } from 'react-toastify'
import UserList, { UserAdminDetails } from '../components/UserList'

// only admins can access this page - done
// link to register user page - done
// get list of users - done
// implement loading - done
// delete user
// reset password = edit user's password

export default function Admin() {
  const { state } = useContext(AuthContext)
  const { protectedRoute } = useAuth()
  const [users, setUsers] = useState<UserAdminDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // auth protection
  protectedRoute()

  const getAllUsers = async () => {
    try {
      setIsLoading(true)
      const response = await customFetch.get('api/v1/auth/get-all-users')

      setUsers(response.data.users)
      setIsLoading(false)
    } catch (error) {
      const errMsg = error.response.data
        ? error.response.data.msg
        : error.message
      console.log('Error: ', errMsg)
      toast.error(errMsg)
      setIsLoading(false)
    }
  }

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
        disabled={isLoading}
      >
        {isLoading ? 'loading...' : 'Get All Users'}
      </button>
      <br />
      <br />
      <button
        onClick={() => setUsers([])}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Clear User List
      </button>
      <br />
      <br />
      <UserList users={users} />
    </>
  )
}
