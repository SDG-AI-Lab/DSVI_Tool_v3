import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function HighResLayers() {
  const { state, dispatch } = useContext(FilterContext)
  const { geodata } = state

  return (
    <>
      <a
        className="flex h-12 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4
                    px-2 text-sm text-gray-700 transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
        data-mdb-ripple="true"
        data-mdb-ripple-color="primary"
        data-bs-toggle="collapse"
        data-bs-target="#collapseSidenavSecEx3"
        aria-expanded="false"
        aria-controls="collapseSidenavSecEx3"
        onClick={() => dispatch({ type: 'TOGGLE_GEODATA' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>High Res. Layers</span>
        {geodata.status == true ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-16 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-16 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </a>
      <ul
        className="accordion-collapse collapse relative"
        id="collapseSidenavSecEx3"
        aria-labelledby="sidenavSecEx3"
        data-bs-parent="#sidenavSecExample"
      >
        {geodata.status == true &&
          geodata.data.map((val, index) => {
            return (
              <li className="relative" key={index}>
                <a
                  href="#!"
                  className=" mt-3 flex h-6 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4
                              pl-12 pr-6 text-xs font-bold text-gray-700
                              transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="primary"
                >
                  {val.title}
                </a>
                <DragDropContext
                  onDragEnd={(result) =>
                    dispatch({
                      type: 'DRAG_DROP_SIDEBAR_GEODATA',
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
                                        className="flex h-6 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded
                                                      py-4 pl-2 pr-6 text-xs text-gray-700
                                                      transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="primary"
                                      >
                                        {val2.title}
                                      </a>
                                    </div>
                                    {val2.status == true ? (
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

export default HighResLayers
