import React,{useReducer} from 'react'
import {reducer,initalState} from '../reducer/legendReducer'

export const LegendContext = React.createContext()

export const LegendProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initalState)
    return(
        <LegendContext.Provider value={{legendData: state,dispatch}}>
            {children}
        </LegendContext.Provider> 
    ) 
}