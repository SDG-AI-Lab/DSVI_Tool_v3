import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'

export const useProtectedRoute = () => {
  const { state: authState } = useContext(AuthContext)
  const [route, setRoute] = useState('')
  const router = useRouter()
  console.log(router)
  useEffect(() => {
    if (router.route === route /*|| router.route !== 'register'*/) return
    setRoute(router.route)
  }, [router.route])

  useEffect(() => {
    if (typeof window !== 'undefined' && !authState.user) {
      router.push('/landing')
    }
  }, [authState.user, route])
}
