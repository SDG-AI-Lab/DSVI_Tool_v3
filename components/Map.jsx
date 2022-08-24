// Deleting this file does not break the tool - can be removed???

import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
//import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer center={[38.840184,-71.082684]} zoom={14} scrollWheelZoom={false} style={{height: "200%", width: "100%"}}> #38.840184, -71.082684 38.917275, 71.014469
      <Marker 
      position={[40.8054,-74.0241]}
      draggable={true}
      animate={true}
      >
        <Popup>
          Hey ! you found me
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map