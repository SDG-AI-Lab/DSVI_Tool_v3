import React, { useReducer } from 'react'
import {
  reducer,
  initialState,
  LegendReducerStateType,
} from '../reducer/legendReducer'

type LegendContextType = {
  legendData: LegendReducerStateType
  dispatch: React.Dispatch<any>
}

export const LegendContext = React.createContext<LegendContextType | undefined>(
  undefined
)

export const LegendProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <LegendContext.Provider value={{ legendData: state, dispatch }}>
      {children}
    </LegendContext.Provider>
  )
}
