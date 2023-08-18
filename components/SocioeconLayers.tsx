import React, { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'
import {
  DollarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  AdministrativeIcon,
} from './SVGs'
import AdminLevels from './AdminLevels'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function SocioeconLayers() {
  const { state, dispatch } = useContext(FilterContext)
  const { socioeconomic } = state

  const classNames =
    'flex items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 text-gray-700 transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600'

  const inputClassNames =
    'input-sm mx-2 w-14 border rounded border-solid border-gray-300 bg-white bg-clip-padding text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'

  return (
    <>
      <a
        className={`h-12 cursor-pointer px-2 text-sm ${classNames}`}
        data-mdb-ripple="true"
        data-mdb-ripple-color="primary"
        data-bs-toggle="collapse"
        data-bs-target="#collapseSidenavSecEx2"
        aria-expanded="false"
        aria-controls="collapseSidenavSecEx2"
        onClick={() => dispatch({ type: 'TOGGLE_SOCIOECONOMIC' })}
      >
        <DollarIcon />
        <span>Socioeconomic Layers</span>
        {socioeconomic.status ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </a>
      {socioeconomic.status && (
        <div className="relative">
          <span
            className={`h-12 px-5 text-sm ${classNames}`}
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
          >
            <AdministrativeIcon />
            <span>Select administrative level</span>
          </span>
          <AdminLevels />
        </div>
      )}

      {/* {socioeconomic.status == true &&
          <ul className="flex">
            {
              [{
                slug: '_sum',
                title: 'Sum'
              },
              {
                slug: '_count',
                title: 'Count'
              },
              {
                slug: '_avg',
                title: 'AVG'
              }].map((val, index) => {
                return (
                  <div key={index}>
                    <div className="flex" onClick={ () => { dispatch({ type: "CHANGE_SOCIOECONOMIC_DATA_COLUMN", payload: val.slug }) }}>
                      <input className="ml-5  bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" type="radio"
                        checked={val.slug == socioeconomic.data_column ? true : false}
                        onChange={() => {dispatch({ type: "CHANGE_SOCIOECONOMIC_DATA_COLUMN", payload: val.slug })}}
                      />
                      <a href="#!" className="flex items-center text-xs  pl-2  h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>
                    </div>
                    <div className="text-gray-700">
                    </div>
                  </div>
                )
              })
            }
          </ul>
        } */}

      <ul
        className="accordion-collapse collapse relative"
        id="collapseSidenavSecEx3"
        aria-labelledby="sidenavSecEx3"
        data-bs-parent="#sidenavSecExample"
      >
        {socioeconomic.status &&
          socioeconomic.data.map((val, index) => {
            return (
              <li className="relative" key={val.title}>
                <a
                  href="#!"
                  className={`mt-3 h-6 pl-12 pr-6 text-xs font-bold ${classNames}`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="primary"
                >
                  {val.title}
                </a>
                <DragDropContext
                  onDragEnd={(result) =>
                    dispatch({
                      type: 'DRAG_DROP_SIDEBAR_SOCIOECONOMIC',
                      payload: result,
                      index_1: index,
                    })
                  }
                >
                  <Droppable droppableId={val.id.toString()}>
                    {(provided) => (
                      <ul
                        className={val.id.toString()}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {val.data &&
                          val.data.map((val2, index2) => {
                            return (
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
                                          reverse_meaning: val2.reverse_meaning,
                                          units: val2.units,
                                          json_library: val2.json_library,
                                        }
                                        dispatch({
                                          type: 'CHANGE_SOCIOECONOMIC',
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
                                        id="flowbite"
                                        aria-describedby="flowbite"
                                        type="checkbox"
                                        checked={val2.status}
                                        onChange={(event) => {
                                          const newItem = {
                                            id: val2.id,
                                            slug: val2.slug,
                                            title: val2.title,
                                            status: !val2.status,
                                            value: val2.value,
                                            reverse_meaning:
                                              val2.reverse_meaning,
                                            units: val2.units,
                                            json_library: val2.json_library,
                                          }
                                          dispatch({
                                            type: 'CHANGE_SOCIOECONOMIC',
                                            payload: newItem,
                                            index_1: index,
                                            index_2: index2,
                                          })
                                        }}
                                      />
                                      <a
                                        href="#!"
                                        className={`h-6 pl-2 pr-6 text-xs ${classNames}`}
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="primary"
                                      >
                                        {val2.title}
                                      </a>
                                    </div>
                                    {val2.status ? (
                                      <div className="flex flex-col space-y-2 p-2">
                                        <div className="px-6">
                                          <span className="text-sm text-gray-700">
                                            opacity:
                                            <input
                                              type="number"
                                              className={inputClassNames}
                                              value={parseInt(val2.value)}
                                              onChange={(event) => {
                                                const newItem = {
                                                  id: val2.id,
                                                  slug: val2.slug,
                                                  title: val2.title,
                                                  status: val2.status,
                                                  value: event.target.value,
                                                  reverse_meaning:
                                                    val2.reverse_meaning,
                                                  units: val2.units,
                                                  json_library:
                                                    val2.json_library,
                                                }
                                                dispatch({
                                                  type: 'CHANGE_SOCIOECONOMIC',
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
                                                  className="form-range h-6 p-0
                                                  focus:shadow-none focus:outline-none focus:ring-0"
                                                  onChange={(event) => {
                                                    const newItem = {
                                                      id: val2.id,
                                                      slug: val2.slug,
                                                      title: val2.title,
                                                      status: val2.status,
                                                      value: event.target.value,
                                                      reverse_meaning:
                                                        val2.reverse_meaning,
                                                      units: val2.units,
                                                      json_library:
                                                        val2.json_library,
                                                    }
                                                    dispatch({
                                                      type: 'CHANGE_SOCIOECONOMIC',
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
                                    ) : null}
                                  </li>
                                )}
                              </Draggable>
                            )
                          })}
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

export default SocioeconLayers
