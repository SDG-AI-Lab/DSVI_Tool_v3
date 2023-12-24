import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

export const useAuth = () => {
  const { dispatch } = useContext(AuthContext)

  const registerUser = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const asyncRegister = async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      if (password !== confirmPassword) {
        toast.error('Passwords are not matching!!!')
        return
      }

      try {
        dispatch({ type: 'REGISTER_USER_PENDING' })

        // user register post request
        const resp = await customFetch.post('api/v1/auth/register', {
          name,
          email,
          password,
        })
        const user = resp.data.user

        dispatch({ type: 'REGISTER_USER_FULFILLED', payload: user })
        toast.success(`Hello there ${user.name}`)
        addUserToLocalStorage(user)
      } catch (error) {
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncRegister(name, email, password, confirmPassword)
  }

  const loginUser = (email: string, password: string) => {
    const asyncLogin = async (email: string, password: string) => {
      try {
        dispatch({ type: 'REGISTER_USER_PENDING' })

        // user login post request
        const resp = await customFetch.post('api/v1/auth/login', {
          email,
          password,
        })
        const user = resp.data.user

        dispatch({ type: 'REGISTER_USER_FULFILLED', payload: user })
        toast.success(`Welcome back ${user.name}`)
        addUserToLocalStorage(user)
      } catch (error) {
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncLogin(email, password)
  }

  const logoutUser = () => {
    const asyncLogout = async () => {
      removeUserFromLocalStorage()
      dispatch({ type: 'REGISTER_USER_PENDING' })

      // for DEV only
      // const pause = (duration) => {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, duration)
      //   })
      // }
      // await pause(2000)

      dispatch({ type: 'REGISTER_USER_FULFILLED', payload: null })
    }
    asyncLogout()
  }

  const protectedRoute = () => {
    const { state: authState } = useContext(AuthContext)
    const [route, setRoute] = useState('')
    const router = useRouter()

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
  return { registerUser, loginUser, logoutUser, protectedRoute }
}
