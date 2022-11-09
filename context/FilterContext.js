import React, {useReducer} from 'react'
import {reducer, initialState} from '../reducer/reducer'

export const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<FilterContext.Provider value={{state, dispatch}}>
            {children}
        </FilterContext.Provider>)
}
