import React,{useState} from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";


const OsmMapNoSSR =dynamic(()=>import("../components/map/osmMap"),{
    ssr:false,
})



const Map1=()=>{

    const [location,setLocation]=useState({lng:34.038,lat:-118.24881})
    return(
        <div>
                    
           
            <Sidebar/>
            <div className="m-10 p-5 bg-white rounded-lg ">
            <OsmMapNoSSR
                center={location}
                location={location}
                draggable={false}
                title="testing"
                onDragMarker={(e)=>{
                    
                    console.log("e".e);
                    let loc= {lat: e.lat, lng:e.lng};
                    setLocation(loc);
                }}
            />

                
            </div>


        </div>
    )
}
export default Map1;