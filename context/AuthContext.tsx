import React, { createContext, useReducer } from 'react'
import { SelectedCountryType } from '../pages/register'

export const AuthContext = createContext(undefined)

export type AuthUser = {
  name: string
  userId: string
  role: 'user' | 'admin'
  countries: SelectedCountryType[]
} | null

export type AuthInitialStateType = {
  isLoading: boolean
  user: AuthUser
  error: any
}

export type AuthProviderActionType = {
  type:
    | 'AUTHENTICATION_PENDING'
    | 'REGISTER_USER_FULFILLED'
    | 'REGISTER_USER_REJECTED'
    | 'AUTHENTICATE_USER_FULFILLED'
    | 'AUTHENTICATE_USER_REJECTED'
  payload: any
}

export const AuthProvider = ({ children }) => {
  const initialState: AuthInitialStateType = {
    isLoading: false,
    user: null,
    error: null,
  }

  const reducer = (
    state: AuthInitialStateType,
    action: AuthProviderActionType
  ): AuthInitialStateType => {
    switch (action.type) {
      case 'AUTHENTICATION_PENDING':
        return { ...state, isLoading: true }
      case 'REGISTER_USER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          // user: null,
        }
      case 'REGISTER_USER_REJECTED': {
        // choosing between express server error and axios error
        // const errMsg = action.payload.response.data
        //   ? action.payload.response.data.msg
        //   : action.payload.message

        // toast.error(errMsg)
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          // user: null,
        }
      }
      case 'AUTHENTICATE_USER_FULFILLED': {
        return { ...state, isLoading: false, user: action.payload }
      }
      case 'AUTHENTICATE_USER_REJECTED': {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          user: null,
        }
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
