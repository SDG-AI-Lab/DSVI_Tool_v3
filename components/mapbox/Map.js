import React, { useRef, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from "./Map.module.scss";


const OsmMap = ({ center, draggable, onDragMarker, location }) => {
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


    return (
        <MapContainer
            center={[13.883084, 120.921398]}
            zoom={15}
            scrollWheelZone={true}
            className={styles.container}
        >



            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            />

            <Marker
                icon={customIcon}
                position={
                    [
                        location && location.lng ? location.lng : "",
                        location && location.lat ? location.lat : "",
                    ]
                }
                draggable={draggable}
                dragHandlers={dragHandlers}
                ref={markerRef}
            >
                <Popup className={styles.popup}>
                    {"my title"}
                </Popup>
            </Marker>
        </MapContainer>
    )
}
export default OsmMap;