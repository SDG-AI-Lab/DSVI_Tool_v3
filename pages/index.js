import React, { useState, useContext } from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";
import DataSidebar from "../components/map/DataSidebar";
import { FilterContext } from '../context/FilterContext'

const OsmMapNoSSR = dynamic(() => import("../components/mapbox/Maplatest"), {
    ssr: false,
})
const Map1 = () => {
    const { state } = useContext(FilterContext);
    const show_sidebar = state["show_sidebar"];
    const [location, setLocation] = useState({ lng: 42.883084, lat: 70.921398 })
    return (
        <>
            <div className="flex">
                <Sidebar />
                {/* <div className={`m-2 p-2 bg-white rounded-lg h-fit w-full`}>
                    <OsmMapNoSSR
                        center={location}
                        location={location}
                        draggable={false}
                        title="testing"
                        onDragMarker={(e) => {
                            let loc = { lat: e.lat, lng: e.lng };
                            setLocation(loc);
                        }}
                    />
                </div> */}
                <OsmMapNoSSR
                        center={location}
                        location={location}
                        draggable={false}
                        title="testing"
                        onDragMarker={(e) => {
                            let loc = { lat: e.lat, lng: e.lng };
                            setLocation(loc);
                        }}
                    />
                <DataSidebar />
            </div>
        </>
    )
}
export default Map1;