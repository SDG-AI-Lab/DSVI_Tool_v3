import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { addUserToLocalStorage } from '../../utils/localStorage'

export const useRegister = () => {
  const { state, dispatch } = useContext(AuthContext)

  const registerUser = (name: string, email: string, password: string) => {
    const asyncRegister = async (
      name: string,
      email: string,
      password: string
    ) => {
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
        dispatch({ type: 'REGISTER_USER_FULFILLED', error })
        console.log(error)
      }
    }
    asyncRegister(name, email, password)
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
        const errMsg = error.response.data.msg || error.message
        dispatch({ type: 'REGISTER_USER_REJECTED', payload: error })
        toast.error(errMsg)
      }
    }
    asyncLogin(email, password)
  }
  return { registerUser, loginUser }
}
