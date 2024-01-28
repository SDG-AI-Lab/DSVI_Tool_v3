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
        // choosing between express server error and axios error
        const errMsg = action.payload.response.data
          ? action.payload.response.data.msg
          : action.payload.message

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
