import React, { createContext, useReducer } from 'react'
// import { getUserFromLocalStorage } from '../utils/localStorage'
import { toast } from 'react-toastify'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  type AuthInitialStateType = {
    isLoading: boolean
    user: { name: string; userId: string; role: string } | null
    error: any
    isAuthenticated: boolean
  }
  const initialState: AuthInitialStateType = {
    isLoading: false,
    user: null,
    error: null,
    isAuthenticated: false,
  }

  type AuthProviderActionType = {
    type:
      | 'REGISTER_USER_PENDING'
      | 'REGISTER_USER_FULFILLED'
      | 'REGISTER_USER_REJECTED'
      | 'AUTHENTICATE_USER_FULFILLED'
      | 'AUTHENTICATE_USER_REJECTED'
    payload: any
  }

  const reducer = (
    state: AuthInitialStateType,
    action: AuthProviderActionType
  ): AuthInitialStateType => {
    switch (action.type) {
      case 'REGISTER_USER_PENDING':
        return { ...state, isLoading: true }
      case 'REGISTER_USER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          isAuthenticated: true,
        }
      case 'REGISTER_USER_REJECTED': {
        // choosing between express server error and axios error
        const errMsg = action.payload.response.data
          ? action.payload.response.data.msg
          : action.payload.message

        toast.error(errMsg)
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          isAuthenticated: false,
        }
      }
      case 'AUTHENTICATE_USER_FULFILLED': {
        return { ...state, isAuthenticated: action.payload }
      }
      case 'AUTHENTICATE_USER_REJECTED': {
        return { ...state, isAuthenticated: action.payload }
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
