import { useContext, useEffect } from 'react'
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
        const response = await customFetch.post('api/v1/auth/register', {
          name,
          email,
          password,
        })

        const user = response.data.user
        const payload = { user, isAuthenticated: false }

        dispatch({ type: 'REGISTER_USER_FULFILLED', payload })
        toast.success(
          `Verification email sent. Please verify account, then login`
        )
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
        const response = await customFetch.post('api/v1/auth/login', {
          email,
          password,
        })

        const { user } = response.data

        const payload = { user, isAuthenticated: true }
        dispatch({ type: 'REGISTER_USER_FULFILLED', payload })

        toast.success(`Welcome back ${user.name}`)
      } catch (error) {
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncLogin(email, password)
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
          // add user here from server
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
  const logoutUser = () => {
    const asyncLogout = async () => {
      dispatch({ type: 'REGISTER_USER_PENDING' })

      // for DEV only
      // const pause = (duration) => {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, duration)
      //   })
      // }
      // await pause(2000)

      try {
        const response = await customFetch.get('api/v1/auth/logout')
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: false })
        const { msg } = response.data

        toast.success(msg)
      } catch (error) {
        toast.error(error.message)
      }
    }
    asyncLogout()
  }
  return { registerUser, loginUser, logoutUser, protectedRoute }
}
