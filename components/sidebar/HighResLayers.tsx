import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { ArrowDownIcon, ArrowUpIcon, GlobeIcon } from '../SVGs'
import { Val2 } from './SocioeconLayers'
import OpacityRange from './OpacityRange'

function HighResLayers() {
  const { state, dispatch } = useContext(FilterContext)
  const { geodata } = state

  const onDragEnd = (result: DropResult, index_1: number): void => {
    dispatch({
      type: 'DRAG_DROP_SIDEBAR_GEODATA',
      payload: result,
      index_1,
    })
  }

  const classNames =
    'flex items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 text-gray-700 transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600'

  const onChange = (val2: Val2, index: number, index2: number): void => {
    const newItem = { ...val2, status: !val2.status }
    console.log(val2.layer)
    dispatch({
      type: 'CHANGE_GEODATA',
      payload: newItem,
      index_1: index,
      index_2: index2,
    })
    dispatch({
      type: 'CHANGE_ACTIVE_LEGENDS',
      payload: newItem,
    })
  }

  return (
    <>
      <a
        className={`h-12 cursor-pointer  px-2  text-sm ${classNames}`}
        onClick={() => dispatch({ type: 'TOGGLE_GEODATA' })}
      >
        <GlobeIcon />
        <span>High Res. Layers</span>
        {geodata.status ? (
          <ArrowUpIcon className="ml-14 h-5 w-5" />
        ) : (
          <ArrowDownIcon className="ml-14 h-5 w-5" />
        )}
      </a>
      <ul className="accordion-collapse collapse relative">
        {geodata.status &&
          geodata.data.map((val, index) => {
            return (
              <li className="relative" key={index}>
                <a
                  href="#!"
                  className={`mt-3 h-6 pl-12 pr-6 text-xs font-bold ${classNames}`}
                >
                  {val.title}
                </a>
                <DragDropContext
                  onDragEnd={(result) => onDragEnd(result, index)}
                >
                  <Droppable droppableId={val.id.toString()}>
                    {(provided) => (
                      <ul
                        className={val.id.toString()}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {val.data &&
                          val.data.map((val2, index2) => (
                            <Draggable
                              key={index2}
                              draggableId={index2.toString()}
                              index={index2}
                            >
                              {(provided) => (
                                <li
                                  className="relative"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="i flex items-center">
                                    <input
                                      className="focus:ring-3 ml-5 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                                      id={val2.title}
                                      type="checkbox"
                                      checked={val2.status}
                                      onChange={() =>
                                        onChange(val2, index, index2)
                                      }
                                    />
                                    <label
                                      className={`h-6 cursor-pointer pl-2 pr-6 text-xs ${classNames}`}
                                      htmlFor={val2.title}
                                    >
                                      {val2.title}
                                    </label>
                                  </div>
                                  {console.log(val2)}
                                  {val2.status && (
                                    <OpacityRange
                                      val2={val2}
                                      index={index}
                                      index2={index2}
                                      changeType={'GEODATA'}
                                    />
                                  )}
                                </li>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default HighResLayers
