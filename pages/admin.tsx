import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useAuth } from '../components/hooks/useAuth'

// link to register user page - done
// get list of users
// delete user
// reset password = edit user's password
// only admins can access this page

export default function Admin() {
  const { state } = useContext(AuthContext)
  const router = useRouter()
  const { checkAuth } = useAuth()

  // auth protection

  useEffect(() => {
    checkAuth({ protectedRoute: false })
    console.log('in useeffect')
    if (state.user && state.user.role !== 'admin') {
      toast.error('Not enough rights to view this page')
      router.push('/')
    } else if (!state.user) {
      toast.error('Not enough rights to view this page')
      router.push('/landing')
    }
  }, [router.route])

  if (!state.user) return <></>

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
