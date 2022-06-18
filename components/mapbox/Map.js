import React, { useRef, useMemo, useContext, useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Polyline, Polygon, LayersControl, Popup, WMSTileLayer, GeoJSON } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import CustomTooltip from '../map/Tooltip';
import Legend from '../map/Legend';
import CustomPopup from '../map/Popup';
import styles from './Map.module.scss'
import edudata from '/public/static/edu.json'
import edudata_1 from '/public/static/edu_1.json'
import edudata_2 from '/public/static/edu_2.json'
import edudata_3 from '/public/static/edu_3.json'


import fianancialdata from '/public/static/finan.json'
import healthdata from '/public/static/health.json'
import { FilterContext } from '../../context/FilterContext'
import { LegendContext } from '../../context/LegendContext'
import { Settings, TileProviders } from '../../config/map';
import ControlMenu from '../map/ControlMenu';
import { normalize } from 'path';
const OsmMap = ({ center, draggable, onDragMarker, location }) => {

  const [onselect, setOnselect] = useState({});
  const polygonRefs = React.useRef()
  const [flag, setFlag] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(16);

  const { state, dispatch } = useContext(FilterContext)
  const { state:legenddata,dispatch: setLegendData } = useContext(LegendContext);

  const level = state["level"];
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];

  const socioeconomic = state['socioeconomic']['data'];
  var educational_facilities = socioeconomic.find(
    (e) => e.slug === 'educational_facilities'
  )
  var { status: educational_facilities_status, value: educational_facilities_value, legend: educational_facilities_legend } = educational_facilities;
  var educational_pathOptions = {
    bubblingMouseEvents: false, weight: 1, fillColor: 'yellow',color:'white', opacity: educational_facilities_value / 100, fillOpacity: educational_facilities_value / 100
  }

    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e=> {
      var layer = e.target;
      const { NAME_1, NAME_2, GID_3, osm_id_count } = e.target.feature.properties;
      setOnselect({
        NAME_1, NAME_2, GID_3, osm_id_count
      });
      layer.setStyle({
          weight: 5,
          color: "black",
          fillOpacity: 1
      });
  });
  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight= (e =>{
      setOnselect({});
      e.target.setStyle(style(e.target.feature));
  })
  /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
   highlightFeature and resetHighlight*/


 
  const onEachFeature= (feature, layer)=> {



      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
      });
  }

const NormalizeData=(number,maxNumber,minNumber)=>{
 var val=(number-minNumber) / (maxNumber-minNumber);
  console.log("val",val);
  return mapPolygonColorToDensity(val);
}

  const mapPolygonColorToDensity=(normalizeData => {

    
    return normalizeData = 0
        ? '#00800A'
        :normalizeData = 1
        ? '#FF362C'
        : normalizeData > 8
        ? '#7BCA0C'
        : normalizeData > 11
        ? '#E8FF2C'
        : normalizeData > 14
        ? '#FFDE2C'
        : normalizeData > 17
        ? '#FFAF2C'
        : '#FFEDA0';
})
const style = (feature => {
  const {_stdev,_max,_min}=feature.properties;
    return ({
        fillColor: NormalizeData(_stdev,_max,_min),
        weight: 1,
        opacity: educational_facilities_value/100,
        color: 'white',
        dashArray: '2',
        fillOpacity:educational_facilities_value/100
    });
});


  return (
    <MapContainer
      center={Settings.latlong}
      zoom={Settings.zoom}
      scrollWheelZone={true}
      className={styles.container}
    >
      <LayersControl position="topright">
        {TileProviders.map(({ name, checked, args }) => (
          <LayersControl.BaseLayer {...{ name, checked }} key={name}>
            <WMSTileLayer {...{ ...args }} />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
      <ControlMenu position="topRight" show_data={show_data} show_sidebar_data={show_sidebar_data}
        children={
      
        educational_facilities_status?
        <Legend />
        :
        null
       
       
      
      }
      >



      </ControlMenu>

      {
      educational_facilities_status && level==1 &&
      <GeoJSON 
      
      data={edudata_1} 
      style={style} 
      onEachFeature={onEachFeature}
      children={
        <>

          <CustomTooltip direction="center" offset={[0, 0]} opacity={educational_facilities_value / 100} count={4}
            bgcolor="bg-black-900" textcolor="text-white"
            show_data={show_data}

          />

          <CustomPopup maxWidth="500" maxHeight="auto"
            bgcolor="bg-white"
            textcolor="text-slate-700"
            data={
              [
                {
                  "key": "NAME_1",
                  "value": 5
                },
                {
                  "key": "NAME_2",
                  "value": 5
                },
                {
                  "key": "GID",
                  "value": 6
                },
                {
                  "key": "COUNT",
                  "value": 7
                }
              ]
            }
          />
        </>
      }

      
      
      />
}
{
      educational_facilities_status && level==2 &&
      <GeoJSON 
      
      data={edudata_2} 
      style={style} 
      onEachFeature={onEachFeature}/>
}
      {
      educational_facilities_status && level==3 &&
      <GeoJSON 
      
      data={edudata_3} 
      style={style} 
      onEachFeature={onEachFeature}/>
}


  

    </MapContainer>
  )
}
export default OsmMap;