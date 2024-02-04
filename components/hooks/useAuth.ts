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
        dispatch({ type: 'AUTHENTICATION_PENDING' })

        // user register post request
        const response = await customFetch.post('api/v1/auth/register', {
          name,
          email,
          password,
        })

        dispatch({ type: 'REGISTER_USER_FULFILLED' })
        toast.success(
          `Account created. Verification email sent. Verify email, then login`
        )
      } catch (error) {
        toast.error(error.response.data.msg)
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncRegister(name, email, password, confirmPassword)
  }

  const loginUser = (email: string, password: string) => {
    const asyncLogin = async (email: string, password: string) => {
      try {
        dispatch({ type: 'AUTHENTICATION_PENDING' })

        // user login post request
        const response = await customFetch.post('api/v1/auth/login', {
          email,
          password,
        })

        const { user } = response.data

        dispatch({ type: 'AUTHENTICATE_USER_FULFILLED', payload: user })
        toast.success(`Welcome back ${user.name}`)
      } catch (error) {
        toast.error(error.response.data.msg)
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: error })
      }
    }
    asyncLogin(email, password)
  }

  const checkAuth = ({ protectedRoute }: { protectedRoute: boolean }) => {
    const asyncCheckAuth = async () => {
      try {
        const response = await customFetch.get('api/v1/auth/routing')
        const { user } = response.data

        dispatch({
          type: 'AUTHENTICATE_USER_FULFILLED',
          payload: user,
        })
      } catch (error) {
        if (protectedRoute) {
          toast.warning(error.response.data.msg)
        }
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: null })
      }
    }
    asyncCheckAuth()
  }

  const protectedRoute = () => {
    const router = useRouter()
    const { user } = state

    useEffect(() => {
      checkAuth({ protectedRoute: true })
    }, [router.route])

    if (typeof window === 'undefined') return
    if (!user && router.route === '/') {
      router.push('/landing')
    }
  }
  const logoutUser = () => {
    const asyncLogout = async () => {
      dispatch({ type: 'AUTHENTICATION_PENDING' })

      // for DEV only
      // const pause = (duration) => {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, duration)
      //   })
      // }
      // await pause(2000)

      try {
        const response = await customFetch.get('api/v1/auth/logout')
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: null })
        const { msg } = response.data
        toast.success(msg)
      } catch (error) {
        toast.error(error.message)
      }
    }
    asyncLogout()
  }
  return { registerUser, loginUser, logoutUser, protectedRoute, checkAuth }
}
