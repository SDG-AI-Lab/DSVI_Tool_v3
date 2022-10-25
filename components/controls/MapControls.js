import React from 'react'
import Control from 'react-leaflet-custom-control'
import { Tooltip } from 'react-leaflet'

// Deactivated 25_10_22: No use case yet!

const ControlButton = (props) => {

    return <div className="group">
        {/* <img
            src={props.src}
            alt={props.alt}
            className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${props.className}`}
            tooltip_name="Dummy hover text"
            tooltip_description="Some dummy text here."
        /> */}
        <div className="invisible absolute top-0 right-32 bg-white rounded-md px-2 py-2 absolute text-black text-white w-64 group-hover:visible">
            <strong>{props.tooltipname}</strong> - <span>{props.tooltip_description}</span></div>
    </div>
}

const MapControls = (props) => {

    return <Control position={props.position} style={{ display: "flex" }}>

        <ControlButton
            src="images/country-icon.7a31d42f.png"
            alt="contry selector"
            tooltipname="Dummy hover text"
            tooltip_description="Some dummy text here."
        />
        <ControlButton
            src="images/add-boundaries-icon.409e70b2.png"
            alt="Boundaries"
            className="ml-2"
            tooltipname="Dummy hover text"
            tooltip_description="Some dummy text here."
        />
    </Control>
}


export default MapControls