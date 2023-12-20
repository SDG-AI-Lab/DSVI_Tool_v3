import React, { createContext, useReducer } from 'react'
import { getUserFromLocalStorage } from '../utils/localStorage'

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
      case 'REGISTER_USER_REJECTED':
        return { ...state, isLoading: false, error: action.error.message }
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
