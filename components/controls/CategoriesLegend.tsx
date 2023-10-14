import React from 'react'
import { CategoriesCollectionType } from '../../reducer/reducerInitialState'

type CategoriesLegendProps = {
  category: CategoriesCollectionType
}

function CategoriesLegend({ category }: CategoriesLegendProps) {
  const { title, color } = category

  return (
    <div className="border-t-2 border-b-2 border-gray-200 p-0.5">
      <h2 className="font-bold">Vulnerability</h2>
      <h3>Selected: Categories | {title}</h3>
      <table>
        <tbody>
          <tr>
            <td align="center">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </td>
            <td className="pl-1">{title}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesLegend
