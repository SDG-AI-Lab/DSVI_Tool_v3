import React, { useState, useEffect, useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { SeLayerObjectType } from '../../reducer/reducerInitialState'

type SocioEconLegendProps = {
  layer: SeLayerObjectType
}

function SocioEconLegend({ layer }: SocioEconLegendProps) {
  const { state, dispatch } = useContext(FilterContext)
  const { country } = state
  const [minMeanNumber, setMinMeanNumber] = useState(null)
  const [maxMeanNumber, setMaxMeanNumber] = useState(null)

  useEffect(() => {
    let isMounted = true

    import(
      `/public/static/${country}/${layer.json_library}_${state['level']}.json`
    )
      .then((library) => {
        if (isMounted) {
          const onlyAllMeanNumbers = library.features.map(
            (object) => object.properties._mean
          )

          setMinMeanNumber(Math.min(...onlyAllMeanNumbers))
          setMaxMeanNumber(Math.max(...onlyAllMeanNumbers))
        }
      })
      .catch((error) => console.error('Error loading data: ', error))

    return () => {
      isMounted = false
    }
  }, [])

  const normValue = (coef: number): number => {
    const result = (maxMeanNumber - minMeanNumber) * coef + minMeanNumber
    return result
  }

  return (
    <div className="border-t-2 border-b-2 border-gray-200 p-0.5">
      <h2 className="font-bold">Socioeconomic Layers</h2>
      <h3>Selected: {layer.title}</h3>
      <table className="legend_table">
        <thead>
          <tr>
            <th align="center" colSpan={2}>
              Values
            </th>
            <th align="center">Category</th>
          </tr>
        </thead>
        {!layer.reverse_meaning &&
        minMeanNumber != null &&
        maxMeanNumber != null ? (
          <tbody>
            <tr>
              <td className="h-5 w-5 bg-[#FF362C]"></td>
              <td className="pl-1">
                {normValue(0.8).toFixed(2)} (0.8) - {maxMeanNumber.toFixed(2)}{' '}
                (1.0)
              </td>
              <td className="pl-1">Very High</td>
            </tr>

            <tr>
              <td className="h-5 w-5 bg-[#ff962c]"></td>
              <td className="pl-1">
                {normValue(0.6).toFixed(2)} (0.6) - {normValue(0.8).toFixed(2)}{' '}
                (0.8)
              </td>
              <td className="pl-1">High</td>
            </tr>
            <tr>
              <td className="h-5 w-5 bg-[#FFDE2C]"></td>
              <td className="pl-1">
                {normValue(0.4).toFixed(2)} (0.4) - {normValue(0.6).toFixed(2)}{' '}
                (0.6)
              </td>
              <td className="pl-1">Middle</td>
            </tr>
            <tr>
              <td className="h-5 w-5 bg-[#00800A]"></td>
              <td className="pl-1">
                {normValue(0.2).toFixed(2)} (0.2) - {normValue(0.4).toFixed(2)}{' '}
                (0.4)
              </td>
              <td className="pl-1">Low</td>
            </tr>
            <tr>
              <td className="h-5 w-5 bg-[#0c58ca]"></td>
              <td className="pl-1">
                {minMeanNumber.toFixed(2)} (0.0) - {normValue(0.2).toFixed(2)}{' '}
                (0.2)
              </td>
              <td className="pl-1">Very Low</td>
            </tr>
          </tbody>
        ) : (
          minMeanNumber != null &&
          maxMeanNumber != null && (
            <tbody>
              <tr>
                <td className="h-5 w-5 bg-[#0c58ca]"></td>
                <td className="pl-1">
                  {normValue(0.8).toFixed(2)} (0.8) - {maxMeanNumber.toFixed(2)}{' '}
                  (1.0)
                </td>
                <td className="pl-1">Very High</td>
              </tr>
              <tr>
                <td className="h-5 w-5 bg-[#00800A]"></td>
                <td className="pl-1">
                  {normValue(0.6).toFixed(2)} (0.6) -{' '}
                  {normValue(0.8).toFixed(2)} (0.8)
                </td>
                <td className="pl-1">High</td>
              </tr>
              <tr>
                <td className="h-5 w-5 bg-[#FFDE2C]"></td>
                <td className="pl-1">
                  {normValue(0.4).toFixed(2)} (0.4) -{' '}
                  {normValue(0.6).toFixed(2)} (0.6)
                </td>
                <td className="pl-1">Middle</td>
              </tr>
              <tr>
                <td className="h-5 w-5 bg-[#ff962c]"></td>
                <td className="pl-1">
                  {normValue(0.2).toFixed(2)} (0.2) -{' '}
                  {normValue(0.4).toFixed(2)} (0.4)
                </td>
                <td className="pl-1">Low</td>
              </tr>
              <tr>
                <td className="h-5 w-5 bg-[#FF362C]"></td>
                <td className="pl-1">
                  {minMeanNumber.toFixed(2)} (0.0) - {normValue(0.2).toFixed(2)}{' '}
                  (0.2)
                </td>
                <td className="pl-1">Very Low</td>
              </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  )
}

export default SocioEconLegend
