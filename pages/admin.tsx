import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useAuth } from '../components/hooks/useAuth'

// link to register user page - done
// get list of users
// delete user
// reset password = edit user's password
// only admins can access this page

export default function Admin() {
  const { state } = useContext(AuthContext)
  const { protectedRoute } = useAuth()

  // auth protection
  protectedRoute()

  if (!state.user || (state.user && state.user !== 'admin')) return <></>

  return (
    <>
      <br />
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        <Link href={'/register'}>Register New User</Link>
      </button>
      <br />
      <br />
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Get All Users
      </button>
      <br />
      <br />
    </>
  )
}
