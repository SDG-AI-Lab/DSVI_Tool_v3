import React, { useReducer } from 'react'
import { reducer } from '../reducer/reducer'
import { reducerInitialState } from '../reducer/reducerInitialState'

export const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, reducerInitialState)
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}
