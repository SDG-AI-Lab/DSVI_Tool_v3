import React, { useContext, ChangeEvent } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { CountryNameType } from '../../reducer/reducerInitialState'

export default function SelectCountry() {
  const { state, dispatch } = useContext(FilterContext)
  const { country } = state

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const countryName: CountryNameType = e.target.value as CountryNameType
    dispatch({ type: 'CHANGE_COUNTRY', payload: countryName })

    const coordsAndZoom =
      countryName === 'tajikistan'
        ? { latlong: [38.917275, 71.014469], zoom: 7 }
        : { latlong: [17.050981, 8.981712], zoom: 6 }

    dispatch({ type: 'CHANGE_MAP_SETTINGS', payload: coordsAndZoom })
  }

  return (
    <div>
      <div>
        <input
          type="radio"
          id="tajikistan"
          name="tajikistan"
          value="tajikistan"
          onChange={onChange}
          checked={country === 'tajikistan'}
        />
        <label htmlFor="tajikistan">Tajikistan</label>
      </div>
      <div>
        <input
          type="radio"
          id="niger"
          name="niger"
          value="niger"
          onChange={onChange}
          checked={country === 'niger'}
        />
        <label htmlFor="niger">Niger</label>
      </div>
    </div>
  )
}
