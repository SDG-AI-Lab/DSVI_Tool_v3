import React, { createContext, useReducer } from 'react'
import { getUserFromLocalStorage } from '../utils/localStorage'
import { toast } from 'react-toastify'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    error: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REGISTER_USER_PENDING':
        return { ...state, isLoading: true }
      case 'REGISTER_USER_FULFILLED':
        return { ...state, isLoading: false, user: action.payload }
      case 'REGISTER_USER_REJECTED': {
        // register errors:
        // low number of password characters
        // account with this email exists
        // proper password syntax
        //  login errors:
        // invalid credentials
        console.log(action.payload)
        const errMsg = action.payload.response
          ? action.payload.response.data.err.message
          : 'other error'

        toast.error(errMsg)

        return { ...state, isLoading: false, error: action.payload }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
