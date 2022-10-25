import React, { useContext, useState, useEffect } from 'react'
import { CircleMarker, Popup } from "react-leaflet"
import { FilterContext } from '../../context/FilterContext'
import Papa from "papaparse"
import L from 'leaflet'


const CircleMarkers = () => {
  const {state, dispatch} = useContext(FilterContext)
  const selected_dhs_data_column = state['selected_dhs_data_column']
  const dhs_data_column = state['dhs_data_column']
  const dhsIndicator = state["dhs_indicator"];
  const csv_data = state['csv_data']
  let normalized_csv_data = csv_data
  const selected_dhs_column = dhs_data_column.filter( c => c.id == selected_dhs_data_column )[0]
  const isBlueGreenYellowRed = selected_dhs_column ? selected_dhs_column['BlueGreenYellowRed? (0=No;1=Yes)'] : 0

  useEffect( () => {
    Papa.parse('static/demotool_data.csv', {
      header: true,
      delimiter: ",",
      download: true,
      complete: function(results, file) {
        const data = results.data.filter(point => point.lat && point.lon)
        dispatch({ type: "FETCH_CSV_DATA", payload: data });
      }
    });
  }, [])

  const getColor = (value) => {
    return !isBlueGreenYellowRed ? `hsl(${240 * (1 - value)}, 100%, 50%)` : `hsl(${value * 240}, 100%, 50%)`
  }

  const normalizeValue = (column_name) => {
    const maxValue = Math.max(...csv_data.map(p => {
      return p[column_name];
    }));
    if(maxValue > 1){
      //should normalize values
      const minValue = Math.min(...csv_data.map(p => p[column_name]))
      normalized_csv_data = csv_data.map( p => {
        p[column_name] = (p[column_name] - minValue) / (maxValue - minValue);
        return p
      })
    }
  }

  if(selected_dhs_data_column > 0){
    normalizeValue(selected_dhs_column.Name)
  }

  return <>
    {(dhsIndicator && csv_data && selected_dhs_data_column > 0) && normalized_csv_data.map((point, index) => {
      const {lat, lng} = L.latLng(point.lat, point.lon)
      return (
        <CircleMarker center={[lat, lng]} key={index} radius={2} pathOptions={{ color: getColor(point[selected_dhs_column.Name]) }}>
          <Popup>
            {selected_dhs_column.Name} : {parseFloat(point[selected_dhs_column.Name]).toFixed(2)}
          </Popup>
        </CircleMarker>
      )
    })}
  </>
}




export default CircleMarkers