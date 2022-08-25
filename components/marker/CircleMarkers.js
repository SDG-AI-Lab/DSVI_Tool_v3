import React, { useContext, useState, useEffect } from 'react'
import { CircleMarker, Popup } from "react-leaflet"
import { FilterContext } from '../../context/FilterContext'
import Papa from "papaparse"
import L from 'leaflet'
import colorGradientLookup from '/public/static/color_gradient_lookup.json'


const CircleMarkers = () => {
  const {state, dispatch} = useContext(FilterContext)
  const selected_dhs_data_column = state['selected_dhs_data_column']
  const dhs_data_column = state['dhs_data_column']
  const csv_data = state['csv_data']
  let normalized_csv_data = csv_data
  const selected_dhs_column = dhs_data_column.filter( c => c.id == selected_dhs_data_column )[0]
  const colorLookup = colorGradientLookup.filter( c => c.Name == selected_dhs_column.title)
  const isBlueGreenYellowRed = colorLookup.length > 0 ? colorLookup[0]['BlueGreenYellowRed? (0=No;1=Yes)'] : 0


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
    return !isBlueGreenYellowRed ? `hsl(${360 * (1 - value)}, 100%, 50%)` : `hsl(${value * 360}, 100%, 50%)`
  }

  const normalizeValue = (column_name) => {
    const maxValue = Math.max(...csv_data.map(p => p[column_name]))
    if(maxValue > 1){
      //should normalize values
      const minValue = Math.min(...csv_data.map(p => p[column_name]))
      normalized_csv_data = csv_data.map( p => {
        p[column_name] = (p[column_name] - minValue) / (maxValue - minValue)
        return p
      })
    }
  }

  if(selected_dhs_data_column > 0){
    normalizeValue(selected_dhs_column.title)
  }

  return <>
    {(csv_data && selected_dhs_data_column > 0) && normalized_csv_data.map((point, index) => {
      const {lat, lng} = L.latLng(point.lat, point.lon)
      return (
        <CircleMarker center={[lat, lng]} key={index} radius={2} pathOptions={{ color: getColor(point[selected_dhs_column.title]) }}>
          <Popup>
            {selected_dhs_column.title} : {parseFloat(point[selected_dhs_column.title]).toFixed(2)}
          </Popup>
        </CircleMarker>
      )
    })}
  </>
}




export default CircleMarkers