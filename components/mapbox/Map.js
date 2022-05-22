import React, { useRef, useMemo,useContext } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
import styles from "./Map.module.scss";
import edudata from '/public/static/edu.json';
import fianancialdata from '/public/static/finan.json';
import healthdata from '/public/static/health.json';


import { FilterContext } from '../../context/FilterContext';
const OsmMap = ({ center, draggable, onDragMarker, location }) => {
    
    const { state, dispatch } = useContext(FilterContext);
    

    const socioeconomic = state["socioeconomic"]["data"];
    var health_care_institutions = socioeconomic.find(e => e.slug === 'health_care_institutions');
    var health_care_institutions_status =health_care_institutions.status;

    var financial_institutions = socioeconomic.find(e => e.slug === 'financial_institutions');
    var financial_institutions_status =financial_institutions.status;

    var educational_facilities = socioeconomic.find(e => e.slug === 'educational_facilities');
    var educational_facilities_status =educational_facilities.status;


    const markerRef = useRef(null);

    const dragHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    onDragMarker(marker.getLatLng());
                }
            },
        }),
        []
    );

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [40, 40]
        }
    });

    var customIcon = new LeafIcon({ iconUrl: "/images/marker2.png" });

    const redOptions = { color: 'red' }
    const purpleOptions = { color: 'purple' }
    const orangeOptions = { color: 'orange' }
    
    return (
<>

<MapContainer
           center={[13.883084, 120.921398]}
            zoom={15}
            scrollWheelZone={true}
            className={styles.container}
        >



<TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             //   url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            
           // url="https://api.mapbox.com/styles/v1/osmph/cjqrqpuiq3dl12rscralpdxyo/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoib3NtcGgiLCJhIjoiY2pxbjF6czN2MGllbTQ4bXVuOW44ZDlpbSJ9.pUqHal3xOR1yZUaM6LbLkg"
url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

{educational_facilities_status && edudata.features.map(edulibrary => (
    <Polyline pathOptions={redOptions} positions={edulibrary.geometry.coordinates[0][0]} />
            ))}

{financial_institutions_status && fianancialdata.features.map(finanlibrary => (
    <Polyline pathOptions={purpleOptions} positions={finanlibrary.geometry.coordinates[0][0]} />
            ))}

{health_care_institutions_status && healthdata.features.map(healthlibrary => (
    <Polyline pathOptions={orangeOptions} positions={healthlibrary.geometry.coordinates[0][0]} />
            ))}
       
        </MapContainer>

</>
  

    )
}
export default OsmMap;