import React, { useRef, useMemo, useContext, useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, Polygon, LayersControl, Popup,WMSTileLayer } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import CustomTooltip from '../map/Tooltip';
import Legend from '../map/Legend';
import CustomPopup from '../map/Popup';
import styles from './Map.module.scss'
import edudata from '/public/static/edu.json'
import fianancialdata from '/public/static/finan.json'
import healthdata from '/public/static/health.json'
import { FilterContext } from '../../context/FilterContext'
import { LegendContext } from '../../context/LegendContext'
const OsmMap = ({ center, draggable, onDragMarker, location }) => {

  const [legendTitle,setLegendTitle]=useState(null);

  const { state, dispatch } = useContext(FilterContext)
  const { legendData, dispatch: setLegendData } = useContext(LegendContext);
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
  const socioeconomic = state['socioeconomic']['data']
  var health_care_institutions = socioeconomic.find(
    (e) => e.slug === 'health_care_institutions'
  )

  var health_care_institutions_status = health_care_institutions.status
  var health_care_institutions_value = health_care_institutions.value
  var health_pathOptions = {
    weight: 1, fillColor: 'purple', color: 'white', opacity: health_care_institutions_value / 100, fillOpacity: health_care_institutions_value / 100
  }


  var financial_institutions = socioeconomic.find(
    (e) => e.slug === 'financial_institutions'
  )
  var financial_institutions_status = financial_institutions.status
  var financial_institutions_value = financial_institutions.value
  var financial_pathOptions = {
    weight: 1, fillColor: 'orange', color: 'white', opacity: financial_institutions_value / 100, fillOpacity: financial_institutions_value / 100
  }

  var educational_facilities = socioeconomic.find(
    (e) => e.slug === 'educational_facilities'
  )
  var educational_facilities_status = educational_facilities.status
  var educational_facilities_value = educational_facilities.value;
  var educational_facilities_legend = educational_facilities.legend;
  var educational_pathOptions = {
    weight: 1, fillColor: 'yellow', color: 'white', opacity: educational_facilities_value / 100, fillOpacity: educational_facilities_value / 100
  }
  
    const highlightFeature = async(e,data) => {
    //  setLegendData(data);
    //console.log(e);
  await setLegendData({ type: "CHANGE_TITLE", payload: {title:'jptjdfjfj'} })
    let layer = e.target;
  await  layer.setStyle({
    // color: "gray",
      fillColor: "black",
      weight:5
    });
    
  //  setLegendTitle("tggggggggg");
  };
  const highlightFeature2 =async (e) => {
   await setLegendData({ type: "CHANGE_TITLE", payload: {title:'null'} });
    let layer = e.target;
   await layer.setStyle({
      //color: "white",
      fillColor: "yellow",
      weight:1
    });
    
  };

  return (
    <MapContainer
      center={[38.840184, -71.082684]}
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
          <svg xmlns="http://www.w3.org/2000/svg" className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-2 h-10 w-10 ${show_data == true ? 'stroke-blue-500' : 'stroke-black-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"

            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              dispatch({ type: "TOGGLE_SHOW_DATA", payload: {} })
            }}

          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>



          <svg xmlns="http://www.w3.org/2000/svg" className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 ml-2 cursor-pointer bg-white border-blue-600 border-2 p-2 h-10 w-10 ${show_sidebar_data == true ? 'stroke-blue-500' : 'stroke-black-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              dispatch({ type: "TOGGLE_SIDEBAR_DATA", payload: {} })
            }}

          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>

        
        


      </Control>
      <Control position='topright' >
      {educational_facilities_status && <Legend  
      //title={educational_facilities_legend[0]["title"]}
      //description={educational_facilities_legend[0]["description"]}
      //data={legendData}
      
      />}
        </Control>
     

      {educational_facilities_status &&

edudata.features.map((edulibrary,index) => {
const data=[
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



return(
  <>
  <Polygon key={index} pathOptions={educational_pathOptions} positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])}

      children={
          <>

              <CustomTooltip direction="center" offset={[0, 0]} opacity={educational_facilities_value / 100} count={edulibrary.properties.osm_id_count}
                  bgcolor="bg-red-900" textcolor="text-white"
                  show_data={show_data}

              />
{
  /**
   *               <CustomPopup maxWidth="500" maxHeight="auto"
                  bgcolor="bg-white"
                  textcolor="text-slate-700"
                  data={data}
              />
   * 
   */
}

          </>
      }


      eventHandlers={{
          mouseover: async(e) => {
           // e.target.preventDefault();

          await  highlightFeature(e,data);

              //e.target.openPopup();
          },
          mouseout: async(e) => {
            //e.preventDefault();
        await  highlightFeature2(e);
            /*   setTimeout(() => {
                setLegendData(null);
              highlightFeature2(e);
              }, 1000);*/
          },
      }}
  />

</>
)

})}



      {financial_institutions_status &&
        fianancialdata.features.map((finanlibrary,index) => (

          <Polygon  key={index} pathOptions={financial_pathOptions} positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}

          children={
            <>

              <CustomTooltip direction="center" offset={[0, 0]} opacity={financial_institutions_value / 100} count={finanlibrary.properties.osm_id_count}
                bgcolor="bg-red-900" textcolor="text-white"
                show_data={show_data}

              />

              <CustomPopup maxWidth="500" maxHeight="auto"
                bgcolor="bg-white"
                textcolor="text-slate-700"
                data={
                  [
                    {
                      "key": "NAME_1",
                      "value": finanlibrary.properties.NAME_1
                    },
                    {
                      "key": "NAME_2",
                      "value": finanlibrary.properties.NAME_2
                    },
                    {
                      "key": "GID",
                      "value": finanlibrary.properties.GID_3
                    },
                    {
                      "key": "COUNT",
                      "value": finanlibrary.properties.osm_id_count
                    }
                  ]
                }
              />
            </>
          }
        />

        ))}

      {health_care_institutions_status &&
        healthdata.features.map((healthlibrary,index) => (
          <Polygon  key={index} pathOptions={health_pathOptions} positions={L.GeoJSON.coordsToLatLngs(healthlibrary.geometry.coordinates[0][0])}

          children={
            <>

              <CustomTooltip direction="center" offset={[0, 0]} opacity={health_care_institutions_value / 100} count={healthlibrary.properties.osm_id_count}
                bgcolor="bg-red-900" textcolor="text-white"
                show_data={show_data}

              />

              <CustomPopup maxWidth="500" maxHeight="auto"
                bgcolor="bg-white"
                textcolor="text-slate-700"
                data={
                  [
                    {
                      "key": "NAME_1",
                      "value": healthlibrary.properties.NAME_1
                    },
                    {
                      "key": "NAME_2",
                      "value": healthlibrary.properties.NAME_2
                    },
                    {
                      "key": "GID",
                      "value": healthlibrary.properties.GID_3
                    },
                    {
                      "key": "COUNT",
                      "value": healthlibrary.properties.osm_id_count
                    }
                  ]
                }
              />
            </>
          }
        />
        ))}
    </MapContainer>

  )
}
export default OsmMap