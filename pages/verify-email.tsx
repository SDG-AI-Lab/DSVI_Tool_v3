import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import customFetch from '../utils/axios'
import Link from 'next/link'

export default function VerifyEmail() {
  const [errorText, setErrorText] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { token, email } = router.query

  // may need to set isAuthenticated to false in case other
  // user is signed while new user is verifying email

  const verifyToken = async () => {
    setLoading(true)

    try {
      if (token && email) {
        const { data } = await customFetch.post('api/v1/auth/verify-email', {
          verificationToken: token,
          email: email,
        })
      }
    } catch (error) {
      setErrorText(error.response.data.msg)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (token && email) {
      verifyToken()
    }
  }, [router.query])

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (errorText) {
    return <h4>{errorText}</h4>
  }

  return (
    <>
      <h2>Account Confirmed</h2>
      <Link href={'/register'}>Please login</Link>
    </>
  )
}
