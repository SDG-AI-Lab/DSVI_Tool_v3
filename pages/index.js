import React,{useState,useContext} from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";
import DataSidebar from "../components/map/DataSidebar";
import { FilterContext } from '../context/FilterContext'
const OsmMapNoSSR =dynamic(()=>import("../components/mapbox/Map"),{
    ssr:false,
})
const Map1=()=>{
    const { state} = useContext(FilterContext);
    const show_sidebar = state["show_sidebar"];
    const [location,setLocation]=useState({lng:42.883084,lat:70.921398})   
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
            <DataSidebar/>
        </>
    )
}
export default Map1;