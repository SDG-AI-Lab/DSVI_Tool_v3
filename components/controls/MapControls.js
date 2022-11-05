import React, { useContext } from 'react';
import {FilterContext} from '../../context/FilterContext'
import Control from 'react-leaflet-custom-control';
// import { Tooltip } from 'react-leaflet';
import { Tooltip } from '@mui/material';

const ControlButton = (props) => {
    return <div className="group">
        <img
            src={props.src}
            alt={props.alt}
            className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${props.className}`}
            tooltip_name="Dummy hover text"
            tooltip_description="Some dummy text here."
        />
        <div className="invisible absolute top-0 right-32 bg-white rounded-md px-2 py-2 absolute text-black text-white w-64 group-hover:visible">
            <strong>{props.tooltipname}</strong> - <span>{props.tooltip_description}</span></div>
    </div>
}

const MapControls = (props) => {
    const { state, dispatch } = useContext(FilterContext);
    const {show_infoBox_data} = state['show_infoBox_data'];

    // <Control position={props.position} style={{ display: "flex" }}>
        {/* <ControlButton
            src="./images/country-icon.7a31d42f.png"
            alt="contry selector"
            tooltipname="Dummy hover text"
            tooltip_description="Some dummy text here."
        />
        <ControlButton
            src="./images/add-boundaries-icon.409e70b2.png"
            alt="Boundaries"
            className="ml-2"
            tooltipname="Dummy hover text"
            tooltip_description="Some dummy text here."
        /> */}
    {/* </Control> */}
    return  <Control position={props.position}>
      <div>
        {/* <svg xmlns="http://www.w3.org/2000/svg"
                className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${show_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch({type: "TOGGLE_SHOW_DATA", payload: {}})
                }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
            </svg> */}

        <Tooltip
            title="Trigger Info Box"
            placement='left-start'
            PopperProps={{
            sx: {
                // right: "10px !important",
                "& .MuiTooltip-tooltip": {
                color: 'black',
                backgroundColor: 'white',
                height: 40,
                borderRadius: '5px',
                fontSize: 12,
                textAlign: 'center',
                }
            }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg"
            className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 ml-2 
            cursor-pointer bg-white box-content border-solid border-2 border-[#00000033] rounded-[5px] h-11 w-11
            ${show_infoBox_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
            fill="none" viewBox="-2 0 52 44" stroke="currentColor" strokeWidth="2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch({ type: "TOGGLE_INFOBOX_DATA", payload: {} })
            }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M 39.26,6.74
            C 30.28,-2.25 15.72,-2.25 6.74,6.74
            -2.25,15.72 -2.25,30.28 6.74,39.26
            15.72,48.25 30.28,48.25 39.26,39.26
            48.25,30.28 48.25,15.72 39.26,6.74 Z
            M 26.00,33.00
            C 26.00,34.66 24.66,36.00 23.00,36.00
            21.34,36.00 20.00,34.66 20.00,33.00
            20.00,33.00 20.00,21.00 20.00,21.00
            20.00,19.34 21.34,18.00 23.00,18.00
            24.66,18.00 26.00,19.34 26.00,21.00
            26.00,21.00 26.00,33.00 26.00,33.00 Z
            M 22.95,15.87
            C 21.22,15.87 20.07,14.65 20.10,13.14
            20.07,11.55 21.22,10.37 22.98,10.37
            24.75,10.37 25.86,11.55 25.90,13.14
            25.90,14.65 24.75,15.87 22.95,15.87 Z" />
            </svg>
        </Tooltip>
        
      </div>
    </Control>
}


export default MapControls