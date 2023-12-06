import React, { useContext, ChangeEvent } from 'react'
import { FilterContext } from '../../context/FilterContext'

export default function SelectCountry() {
  const { state, dispatch } = useContext(FilterContext)
  const { country } = state

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const countryName = e.target.value
    dispatch({ type: 'CHANGE_COUNTRY', payload: countryName })

    const coords =
      countryName === 'tajikistan'
        ? [38.917275, 71.014469]
        : [17.050981, 8.981712]

    dispatch({ type: 'CHANGE_COORDS', payload: coords })
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
