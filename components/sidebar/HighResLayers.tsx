import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { ArrowDownIcon, ArrowUpIcon, GlobeIcon } from '../SVGs'

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
                  className={`${classNames} mt-3 h-6 pl-12 pr-6 text-xs font-bold`}
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
                                  <div
                                    className="i flex items-center"
                                    onClick={() => {
                                      const newItem = {
                                        id: val2.id,
                                        slug: val2.slug,
                                        title: val2.title,
                                        status: !val2.status,
                                        value: val2.value,
                                        layer: val2.layer,
                                      }
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
                                    }}
                                  >
                                    <input
                                      className="focus:ring-3 ml-5 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                                      type="checkbox"
                                      checked={val2.status}
                                      onChange={(event) => {
                                        const newItem = {
                                          id: val2.id,
                                          slug: val2.slug,
                                          title: val2.title,
                                          status: !val2.status,
                                          value: val2.value,
                                          layer: val2.layer,
                                        }
                                        dispatch({
                                          type: 'CHANGE_GEODATA',
                                          payload: newItem,
                                          index_1: index,
                                          index_2: index2,
                                        })
                                      }}
                                    />
                                    <a
                                      href="#!"
                                      className={`h-6 pl-2 pr-6 text-xs ${classNames}`}
                                    >
                                      {val2.title}
                                    </a>
                                  </div>
                                  {val2.status && (
                                    <div className="flex flex-col space-y-2 p-2">
                                      <div className="px-6">
                                        <span className="text-sm text-gray-700">
                                          opacity:
                                          <input
                                            type="number"
                                            className="input-sm mx-2 w-14 rounded border border-solid
                                                                border-gray-300 bg-white bg-clip-padding text-base font-normal text-gray-700
                                                                transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700
                                                                focus:outline-none"
                                            value={parseInt(val2.value)}
                                            onChange={(event) => {
                                              const newItem = {
                                                id: val2.id,
                                                slug: val2.slug,
                                                title: val2.title,
                                                status: val2.status,
                                                value: event.target.value,
                                                layer: val2.layer,
                                              }
                                              dispatch({
                                                type: 'CHANGE_GEODATA',
                                                payload: newItem,
                                                index_1: index,
                                                index_2: index2,
                                              })
                                            }}
                                          />
                                          <div>
                                            <div>
                                              <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                step="1"
                                                value={val2.value}
                                                className="form-range h-6 p-0 focus:shadow-none focus:outline-none focus:ring-0"
                                                onChange={(event) => {
                                                  const newItem = {
                                                    id: val2.id,
                                                    slug: val2.slug,
                                                    title: val2.title,
                                                    status: val2.status,
                                                    value: event.target.value,
                                                    layer: val2.layer,
                                                  }
                                                  dispatch({
                                                    type: 'CHANGE_GEODATA',
                                                    payload: newItem,
                                                    index_1: index,
                                                    index_2: index2,
                                                  })
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </span>
                                      </div>
                                    </div>
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
