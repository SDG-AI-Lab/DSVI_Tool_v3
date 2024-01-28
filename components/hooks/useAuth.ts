import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext)

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
        // addUserToLocalStorage(user)
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
        // addUserToLocalStorage(user)
      } catch (error) {
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncLogin(email, password)
  }

  const logoutUser = () => {
    const asyncLogout = async () => {
      // removeUserFromLocalStorage()
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
    const router = useRouter()

    const { isAuthenticated } = state

    useEffect(() => {
      authenticateRouting()
    }, [router.route])

    const authenticateRouting = async () => {
      try {
        const response = await customFetch.get('api/v1/auth/routing')
        const { isAuthenticated } = response.data

        dispatch({
          type: 'AUTHENTICATE_USER_FULFILLED',
          payload: isAuthenticated,
        })
      } catch (error) {
        const { authenticated } = error.response.data
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: authenticated })
      }
    }

    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push('/landing')
    }
  }
  return { registerUser, loginUser, logoutUser, protectedRoute }
}
