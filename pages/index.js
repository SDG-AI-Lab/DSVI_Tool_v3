import React,{useState,useContext} from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";
import { FilterContext } from '../context/FilterContext'
const OsmMapNoSSR =dynamic(()=>import("../components/mapbox/Map"),{
    ssr:false,
})
const Map1=()=>{
    const { state} = useContext(FilterContext);
    const show_sidebar = state["show_sidebar"];
    const [location,setLocation]=useState({lng:34.038,lat:-118.24881})    
    return(
        <>        
            <Sidebar/>
            <div className={show_sidebar==true?'ml-64 m-10  p-5 bg-white rounded-lg w-[80rem]':'m-10 p-5 bg-white rounded-lg'}>
            <OsmMapNoSSR
                center={location}
                location={location}
                draggable={false}
                title="testing"
                onDragMarker={(e)=>{
                    let loc= {lat: e.lat, lng:e.lng};
                    setLocation(loc);
                }}
            />                
            </div>
        </>
    )
}
export default Map1;