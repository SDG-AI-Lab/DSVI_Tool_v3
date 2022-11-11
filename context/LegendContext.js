import React, {useReducer} from 'react'
import {reducer, initialState} from '../reducer/legendReducer'

export const LegendContext = React.createContext()

export const LegendProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <LegendContext.Provider value={{legendData: state, dispatch}}>
            {children}
        </LegendContext.Provider>)
}
