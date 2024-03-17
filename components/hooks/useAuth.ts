import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  AuthContext,
  AuthUser,
  UserAdminDetails,
} from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { RoleType, SelectedCountryType } from '../../context/AuthContext'

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext)
  const router = useRouter()

  const registerUser = (
    name: string,
    email: string,
    password: string,
    countries: SelectedCountryType[],
    role: RoleType
  ) => {
    const asyncRegister = async (
      name: string,
      email: string,
      password: string,
      countries: SelectedCountryType[],
      role: RoleType
    ) => {
      try {
        dispatch({ type: 'AUTHENTICATION_PENDING' })

        // user register post request
        const response = await customFetch.post('api/v1/auth/register', {
          name,
          email,
          password,
          countries,
          role,
        })

        dispatch({ type: 'REGISTER_USER_FULFILLED' })
        toast.success(
          `Account created. Verification email sent. Verify email, then login`,
          { autoClose: false }
        )
      } catch (error) {
        toast.error(error.response.data.msg)
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
      }
    }
    asyncRegister(name, email, password, countries, role)
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
        console.log('loginUser, user: ', user)

        dispatch({ type: 'AUTHENTICATE_USER_FULFILLED', payload: user })
        toast.success(`Welcome back ${user.name}`)
      } catch (error) {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message

        toast.error(errMsg)
        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: error })
      }
    }
    asyncLogin(email, password)
  }

  const checkAuth = () => {
    console.log('cookie: ', document.cookie)
    const request = customFetch
      .get('api/v1/auth/routing')
      .then((response) => {
        dispatch({
          type: 'AUTHENTICATE_USER_FULFILLED',
          payload: response.data.user,
        })
        return { user: response.data.user }
      })
      .catch((error) => {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message

        dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: errMsg })
        return { error: errMsg }
      })
    return request
  }

  const protectedRoute = () => {
    const redirect = ({ user, error }: { user: AuthUser; error: string }) => {
      if (typeof window === 'undefined') return
      if (router.route === '/' && !user) {
        toast.error(error)
        router.push('/landing')
      } else if (router.route === '/login' && user) {
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else if (
        router.route === '/admin' ||
        router.route === '/register' ||
        router.route === '/admin/edit-user'
      ) {
        if (!user) {
          toast.error('Unauthorized, please login as Admin')
          router.push('/landing')
        } else if (user && user.role !== 'admin') {
          toast.error('Unauthorized, please login as Admin')
          router.push('/')
        }
      }
    }

    useEffect(() => {
      checkAuth().then((response) => {
        let user: AuthUser = null
        let error: string = null
        if ('user' in response) {
          user = response.user
        } else {
          error = response.error
        }

        redirect({ user, error })
      })
    }, [router.route])
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

  const changeUserDetailsAdmin = (values: UserAdminDetails) => {
    dispatch({ type: 'SET_IS_LOADING' })

    customFetch
      .post('api/v1/user/update-user-admin', values)
      .then((response) => {
        // dispatch set admin user with response.data.user?
        toast.success(response.data.msg)
        router.push('/admin')
        dispatch({ type: 'CLEAR_USER_ADMIN_DETAILS', payload: values })
        dispatch({ type: 'CLEAR_IS_LOADING' })
      })
      .catch((error) => {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message
        toast.error(errMsg)
        dispatch({ type: 'CLEAR_IS_LOADING' })
      })
  }

  const deleteUserAccount = (userId: string) => {
    customFetch
      .delete('api/v1/user/delete-user', {
        data: { _id: userId },
      })
      .then((response) => {
        toast.success('User Deleted Successfully')
        router.push('/admin')
      })
      .catch((error) => {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message
        toast.error(errMsg)
      })
  }

  const changePasswordUser = async (passwordValues: {
    oldPassword: String
    newPassword: String
    confirmPassword: String
  }) => {
    const { newPassword, confirmPassword, oldPassword } = passwordValues

    if (newPassword !== confirmPassword) {
      toast.error('New passwords are not matching')
      return
    }
    if (oldPassword === newPassword) {
      toast.error('Cannot use previous password')
      return
    }

    dispatch({ type: 'SET_IS_LOADING' })

    try {
      const response = await customFetch.patch(
        'api/v1/user/update-user-password',
        passwordValues
      )

      toast.success(response.data.msg)
      dispatch({ type: 'CLEAR_IS_LOADING' })
    } catch (error) {
      const errMsg = error.response.data
        ? error.response.data.msg
        : error.message
      toast.error(errMsg)
      dispatch({ type: 'CLEAR_IS_LOADING' })
    }
    // customFetch
    //   .patch('api/v1/user/update-user-password', passwordValues)
    //   .then((response) => {
    //     toast.success(response.data.msg)
    //     dispatch({ type: 'CLEAR_IS_LOADING' })
    //   })
    //   .catch((error) => {
    //     const errMsg = error.response.data
    //       ? error.response.data.msg
    //       : error.message
    //     toast.error(errMsg)
    //     dispatch({ type: 'CLEAR_IS_LOADING' })
    //   })
  }

  return {
    registerUser,
    loginUser,
    logoutUser,
    protectedRoute,
    checkAuth,
    changeUserDetailsAdmin,
    deleteUserAccount,
    changePasswordUser,
  }
}
