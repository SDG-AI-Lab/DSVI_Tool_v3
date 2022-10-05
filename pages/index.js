import React, {useState, useContext, useEffect} from "react";
import dynamic from 'next/dynamic';
import Sidebar from "../components/Sidebar";
import DataSidebar from "../components/controls/Sidebar";
import { FilterContext } from '../context/FilterContext';
import Image from "next/image";

const LeafletMap = dynamic(() => import("../components/leaflet/Map"), {
    ssr: false,
})

const Application = () => {

    const [location, setLocation] = useState({lng: 38.917275, lat: 71.014469}) // 38.917275, 71.014469
    const {state, dispatch} = useContext(FilterContext)
    const on_homepage = state['on_homepage'];

    return (<>
        {on_homepage

        ?   <div style={{backgroundImage: "url('/images/193276268-76e3acfa-fa08-41c4-b2a9-fa57c7dd0a98.jpeg')" }} className="bg-no-repeat bg-cover pl-16 pr-16 h-screen text-white flex flex-col">
                <div className="content-center text-center font-bold"><h1>DSVI Tool V3</h1> <p>Lorem ipsum dolor sit amet. Est alias tempore et galisum delectus et rerum nobis ex corrupti beatae ab voluptates earum? Aut iusto iste ad distinctio repellat sit enim voluptatem</p></div>
                <div className="flex flex-row grow shrink basis-0 items-center">
                    <div className="basis-1/3">
                        <Image
                            src="/images/pngegg (1).png"
                            alt="Logo"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="basis-1/3 text-center">
                        <button
                            onClick={() => dispatch({ type: "QUIT_HOMEPAGE", payload: false })}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Launch tool</button>
                    </div>
                    <div className="basis-1/3"><p>Lorem ipsum dolor sit amet. Est alias tempore et galisum delectus et rerum nobis ex corrupti beatae ab voluptates earum? Aut iusto iste ad distinctio repellat sit enim voluptatem</p></div>
                </div>
                <div className="flex justify-evenly">
                    <div>
                        <Image
                            src="/images/marker1.png"
                            alt="Logo"
                            width={90}
                            height={100}
                        />
                    </div>
                    <div>
                        <Image
                            src="/images/undp_logo (2).png"
                            alt="Logo"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div>
                        <Image
                            src="/images/sdgailablogoblack.png"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </div>
        :   <div className="flex">
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
        }
    </>)
}

export default Application;
