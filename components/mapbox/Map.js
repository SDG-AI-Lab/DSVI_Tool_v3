import React, { useRef, useMemo, useContext,useEffect,useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, LayersControl,Tooltip } from 'react-leaflet'
import styles from './Map.module.scss'
import edudata from '/public/static/edu.json'
import fianancialdata from '/public/static/finan.json'
import healthdata from '/public/static/health.json'

import { FilterContext } from '../../context/FilterContext'
const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)

  const socioeconomic = state['socioeconomic']['data']
  var health_care_institutions = socioeconomic.find(
    (e) => e.slug === 'health_care_institutions'
  )
  var health_care_institutions_status = health_care_institutions.status
  var health_care_institutions_value = health_care_institutions.value

  var financial_institutions = socioeconomic.find(
    (e) => e.slug === 'financial_institutions'
  )
  var financial_institutions_status = financial_institutions.status
  var financial_institutions_value = financial_institutions.value


  var educational_facilities = socioeconomic.find(
    (e) => e.slug === 'educational_facilities'
  )
  var educational_facilities_status = educational_facilities.status
  var educational_facilities_value = educational_facilities.value

  

  const markerRef = useRef(null);





  const dragHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          onDragMarker(marker.getLatLng())
        }
      },
    }),
    []
  )

  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [40, 40],
    },
  })

  
  var customIcon = new LeafIcon({ iconUrl: '/images/marker2.png' })

  const redOptions = { color: 'red' }
  const purpleOptions = { color: 'purple' }
  const orangeOptions = { color: 'orange' }

  return (
    <>


      <MapContainer
        center={[42.883084, 70.921398]}
        zoom={8}
        scrollWheelZone={true}
        className={styles.container}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Osm">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              // url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              url="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite" checked={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com">ESRI</a> '
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Mapbox">
            <TileLayer
              attribution='&copy; <a href="https://mapbox.com">Mapbox</a>'
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              layers="GoogleMapsCompatible"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
       
        {educational_facilities_status &&
          edudata.features.map((edulibrary) => (
    
        

            <Polyline pathOptions={{ color:'red',opacity:educational_facilities_value/100 }}  positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])} />
          ))}
        {financial_institutions_status &&
          fianancialdata.features.map((finanlibrary) => (
            
            <Polyline
            pathOptions={{ color:'orange',opacity:financial_institutions_value/100 }}
              positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}
              
            />
           
          ))}

        {health_care_institutions_status &&
          healthdata.features.map((healthlibrary) => (
            <Polyline
            pathOptions={{ color:'purple',opacity:health_care_institutions_value/100 }}
              positions={L.GeoJSON.coordsToLatLngs(healthlibrary.geometry.coordinates[0][0])}
            />
          ))}
      </MapContainer>
    </>
  )
}
export default OsmMap

