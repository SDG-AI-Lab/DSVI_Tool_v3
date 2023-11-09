import React, { useReducer } from 'react'
import { reducer } from '../reducer/reducer'
import {
  ReducerInitialStateType,
  reducerInitialState,
} from '../reducer/reducerInitialState'

type FilterContextType = {
  state: ReducerInitialStateType
  dispatch: React.Dispatch<any>
}

export const FilterContext = React.createContext<FilterContextType | undefined>(
  undefined
)

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, reducerInitialState)
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}
