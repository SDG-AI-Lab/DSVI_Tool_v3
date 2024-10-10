import React, { useState, useEffect, useContext, useRef } from 'react'
import { FilterContext } from '../../context/FilterContext'
import Control from 'react-leaflet-custom-control'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import L from 'leaflet'
import SocioEconLegend from './SocioEconLegend'
import GeoLegend from './GeoLegend'
import CategoriesLegend from './CategoriesLegend'
import {
  CategoriesCollectionType,
  SeLayerObjectType,
  SvLayerObjectType,
} from '../../reducer/reducerInitialState'

const NewLegend_2 = () => {
  const [showUIElements, setShowUIElements] = useState(false)
  const { state, dispatch } = useContext(FilterContext)
  const vulnerability = state['vulnerability']
  const activeLegends = state['activeLegends']

  const legendRef = useRef()
  useEffect(() => {
    if (legendRef.current) {
      /*Using the wheel will not change the zoom on the map.*/
      L.DomEvent.disableScrollPropagation(legendRef.current)
    }
  })

  useEffect(() => {
    setShowUIElements(true)
    return () => {
      setShowUIElements(false)
    }
  }, [])

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return
    dispatch({ type: 'DRAG_DROP_CHANGE_ACTIVE_LEGENDS', payload: result })
  }

  //  COMMENT #1 WAS HERE
  console.log({ activeLegends })
  return (
    <Control position="bottomright">
      <div
        className="max-h-96 overflow-auto bg-[white] p-1 opacity-70"
        ref={legendRef}
      >
        <h1 className="text-sm font-bold">Legend</h1>
        {showUIElements ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="legends">
              {(provided) => (
                <ul
                  className="legends"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {activeLegends.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.hasOwnProperty('slug') &&
                          item.slug.indexOf('se_') === 0 ? (
                            <SocioEconLegend
                              layer={item as SeLayerObjectType}
                            />
                          ) : null}
                          {item.hasOwnProperty('slug') &&
                          item.slug.indexOf('sv_') === 0 ? (
                            <GeoLegend layer={item as SvLayerObjectType} />
                          ) : null}
                          {item.hasOwnProperty('slug') &&
                          item.slug.indexOf('cats_') === 0 &&
                          vulnerability ? (
                            <CategoriesLegend
                              category={item as CategoriesCollectionType}
                            />
                          ) : null}

                          {/* {item.hasOwnProperty('Name') &&
                            item.hasOwnProperty('Additional Information') ? (
                              <DHS_indicators name={item.Name} />
                            ) : null} */}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}
      </div>
    </Control>
  )
}

export default NewLegend_2

// COMMENT #1:
// const DHS_indicators = (props) => {
//   const { state, dispatch } = useContext(FilterContext)
//   const selected_dhs_data_column = state['selected_dhs_data_column']
//   const dhs_data_column = state['dhs_data_column']
//   const dhsIndicator = state['dhs_indicator']
//   const csv_data = state['csv_data']
//   let normalized_csv_data = csv_data
//   const selected_dhs_column = dhs_data_column.filter(
//     (c) => c.id == selected_dhs_data_column
//   )[0]
//   const isBlueGreenYellowRed = selected_dhs_column
//     ? selected_dhs_column['BlueGreenYellowRed? (0=No;1=Yes)']
//     : 0

//   const getColor = (value) => {
//     return !isBlueGreenYellowRed
//       ? `hsl(${240 * (1 - value)}, 100%, 50%)`
//       : `hsl(${value * 240}, 100%, 50%)`
//   }
//   const getMaxValue = (column_name) => {
//     return Math.max(...csv_data.map((p) => p[column_name]))
//   }
//   const getMinValue = (column_name) => {
//     return Math.min(...csv_data.map((p) => p[column_name]))
//   }

//   const normalizeValue = (column_name) => {
//     const maxValue = Math.max(...csv_data.map((p) => p[column_name]))
//     if (maxValue > 1) {
//       //should normalize values
//       const minValue = Math.min(...csv_data.map((p) => p[column_name]))
//       normalized_csv_data = csv_data.map((p) => {
//         p[column_name] = (p[column_name] - minValue) / (maxValue - minValue)
//         return p
//       })
//     }
//   }

//   if (selected_dhs_data_column > 0) {
//     normalizeValue(selected_dhs_column.Name)
//   }

//   let dataForLegend = []
//   const veryLowValue = getMaxValue(selected_dhs_column.Name) / 6
//   const lowValue = (getMaxValue(selected_dhs_column.Name) * 2) / 6
//   const mediumValue = (getMaxValue(selected_dhs_column.Name) * 3) / 6
//   const highValue = (getMaxValue(selected_dhs_column.Name) * 4) / 6
//   const veryHighValue = (getMaxValue(selected_dhs_column.Name) * 5) / 6
//   dataForLegend = [
//     {
//       color: getColor(getMinValue(selected_dhs_column.Name)),
//       value: getMinValue(selected_dhs_column.Name),
//     },
//     { color: getColor(veryLowValue), value: veryLowValue },
//     { color: getColor(lowValue), value: lowValue },
//     { color: getColor(mediumValue), value: mediumValue },
//     { color: getColor(highValue), value: highValue },
//     { color: getColor(veryHighValue), value: veryHighValue },
//     {
//       color: getColor(getMaxValue(selected_dhs_column.Name)),
//       value: getMaxValue(selected_dhs_column.Name),
//     },
//   ]

//   return (
//     dhsIndicator &&
//     csv_data &&
//     selected_dhs_data_column > 0 && (
//       <div className="border-t-2 border-b-2 border-gray-200 p-0.5">
//         <h2 className="font-bold">DHS Indicators</h2>
//         <h3>Selected: {props.name}</h3>
//         <BarChart data={dataForLegend} />
//       </div>
//     )
//   )
// }
