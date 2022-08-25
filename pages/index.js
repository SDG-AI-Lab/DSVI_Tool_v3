import React, {useState} from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";
import DataSidebar from "../components/controls/Sidebar";

const LeafletMap = dynamic(() => import("../components/leaflet/Map"), {
    ssr: false,
})

const Application = () => {

    const [location, setLocation] = useState({lng: 38.917275, lat: 71.014469}) // 38.917275, 71.014469

    return (<>
            <div className="flex">
                <Sidebar/>
                <LeafletMap
                    center={location}
                    location={location}
                    draggable={false}
                    title="testing"
                    onDragMarker={(e) => {
                        let loc = {lat: e.lat, lng: e.lng};
                        setLocation(loc);
                    }}
                />
                <DataSidebar/>
            </div>
        </>)
}

export default Application;
