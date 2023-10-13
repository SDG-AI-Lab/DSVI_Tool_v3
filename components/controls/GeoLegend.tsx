import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { SvLayerObjectType } from '../../reducer/reducerInitialState'

type GeoLegendProps = {
  layer: SvLayerObjectType
}

function GeoLegend({ layer }: GeoLegendProps) {
  const { state, dispatch } = useContext(FilterContext)

  const arrayLegends = state['geolayers_description'][layer.layer]

  const getWordExplanation = (index: number): string => {
    switch (index) {
      case 0:
        return 'Very Low'
      case 1:
        return 'Low'
      case 2:
        return 'Middle'
      case 3:
        return 'High'
      case 4:
        return 'Very High'
      default:
        return 'Not defined'
    }
  }

  if (!arrayLegends) {
    return (
      <div className="border-t-2 border-b-2 border-gray-200 p-0.5">
        No data for layer: {layer.slug}
      </div>
    )
  } else {
    return (
      <div className="border-t-2 border-b-2 border-gray-200 p-0.5">
        <h2 className="font-bold">Geodata Layers</h2>
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
          <tbody>
            {arrayLegends.map(({ color, label, quantity }, index) => {
              return (
                <tr key={label}>
                  <td
                    className="h-5 w-5"
                    style={{ backgroundColor: color }}
                  ></td>
                  <td className="pl-1">
                    {index !== arrayLegends.length - 1
                      ? `${Number.parseFloat(quantity).toFixed(
                          2
                        )} - ${Number.parseFloat(
                          arrayLegends[index + 1].quantity
                        ).toFixed(2)}`
                      : `${Number.parseFloat(quantity).toFixed(2)}+`}
                  </td>
                  <td className="pl-1">{getWordExplanation(index)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GeoLegend
