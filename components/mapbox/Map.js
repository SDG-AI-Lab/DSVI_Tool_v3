import React, { useRef, useMemo, useContext, useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, Polygon, LayersControl, Popup } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import CustomTooltip from '../map/Tooltip';
import CustomPopup from '../map/Popup';
import styles from './Map.module.scss'
import edudata from '/public/static/edu.json'
import fianancialdata from '/public/static/finan.json'
import healthdata from '/public/static/health.json'
import { FilterContext } from '../../context/FilterContext'
const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
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
  var educational_facilities_value = educational_facilities.value;
  var educational_pathOptions = {
    weight: 1, fillColor: 'yellow', color: 'white', opacity: educational_facilities_value / 100, fillOpacity: educational_facilities_value / 100
  }

  return (
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
      <Control position='topright' >

<div className="border-none flex items-center"> 
<svg xmlns="http://www.w3.org/2000/svg" className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-2 h-10 w-10 ${show_data==true?'stroke-blue-500':'stroke-black-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        
        dispatch({ type: "TOGGLE_SHOW_DATA", payload: {} })}}
      
      >
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
</svg>



<svg xmlns="http://www.w3.org/2000/svg" className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 ml-2 cursor-pointer bg-white border-blue-600 border-2 p-2 h-10 w-10 ${show_sidebar_data==true?'stroke-blue-500':'stroke-black-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
         onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          
          dispatch({ type: "TOGGLE_SIDEBAR_DATA", payload: {} })}}

>
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
</svg>
</div>
     


    
      </Control>

      {educational_facilities_status &&
        edudata.features.map((edulibrary) => (
          <>
            <Polygon pathOptions={educational_pathOptions} positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])}

              children={
                <>
        
                  <CustomTooltip direction="center" offset={[0, 0]} opacity={educational_facilities_value / 100} count={edulibrary.properties.osm_id_count}
                    bgcolor="bg-red-900" textcolor="text-white" 
                    show_data ={show_data}
                    
                    />

                  <CustomPopup maxWidth="500" maxHeight="auto"
                    bgcolor="bg-white"
                    textcolor="text-slate-700"
                    data={
                      [
                        {
                          "key": "NAME_1",
                          "value": edulibrary.properties.NAME_1
                        },
                        {
                          "key": "NAME_2",
                          "value": edulibrary.properties.NAME_2
                        },
                        {
                          "key": "GID",
                          "value": edulibrary.properties.GID_3
                        },
                        {
                          "key": "COUNT",
                          "value": edulibrary.properties.osm_id_count
                        }
                      ]
                    }
                  />
                </>
              }
            />

          </>




        ))}
      {financial_institutions_status &&
        fianancialdata.features.map((finanlibrary) => (

          <Polyline
            pathOptions={{ color: 'orange', opacity: financial_institutions_value / 100 }}
            positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}

          />

        ))}

      {health_care_institutions_status &&
        healthdata.features.map((healthlibrary) => (
          <Polyline
            pathOptions={{ color: 'purple', opacity: health_care_institutions_value / 100 }}
            positions={L.GeoJSON.coordsToLatLngs(healthlibrary.geometry.coordinates[0][0])}
          />
        ))}
    </MapContainer>

  )
}
export default OsmMap