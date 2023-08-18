import React, { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FilterContext } from '../context/FilterContext'
import DHS_COLUMN from '../public/static/color_gradient_lookup.json'
import { BottleIcon, DollarIcon, HeartIcon, ResetIcon } from './SVGs'
import SidebarToggle from './SidebarToggle'

const Sidebar = (props) => {
  const { show_infoBox_data } = props
  const { state, dispatch } = useContext(FilterContext)
  const level = state['level']
  const show_sidebar = state['show_sidebar']
  const areaofInterestStatus2 = state['show_area_of_interest']
  const reset_settings = state['reset_settings']

  const activeLegends = state['activeLegends']
  const socioeconomic = state['socioeconomic']
  const geodata = state['geodata']
  const vulnerability = state['vulnerability']
  const categories = state['categories']
  const dsvIndicator = state['dsv_indicator']
  const dataColumn = state['data_column']
  const dhsIndicator = state['dhs_indicator']
  const dhsDataColumn = state['dhs_data_column']
  const drawofInterestStatus = state['draw_area_of_interest']
  const statisticsStatus = state['statistics']
  const selectedDataColumn = state['selected_data_column']
  const selectedDhsDataColumn = state['selected_dhs_data_column']

  const socioEconomicLayers = state['socioeconomic']['data']
  const geodataLayers = state['geodata']['data']
  const [dsvModal, setDsvModal] = useState(false)
  const [dhsModal, setDhsModal] = useState(false)
  const onOpenDsvModal = () => setDsvModal(true)
  const onCloseDsvModal = () => setDsvModal(false)
  const onOpenDhsModal = () => setDhsModal(true)
  const onCloseDhsModal = () => setDhsModal(false)

  useEffect(() => {
    dispatch({ type: 'FETCH_DHS_COLUMN', payload: DHS_COLUMN })
  }, [])

  function handleOnDragEnd(result) {
    if (!result.destination) return
    const items = Array.from(socioEconomicLayers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    dispatch({ type: 'CHANGE_SOCIOECONOMIC', payload: items })
  }

  function handleOnDragEndCategory(result) {
    if (!result.destination) return
    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    dispatch({ type: 'CHANGE_CATEGORIES', payload: items })
  }

  /* PLS NOT USE */
  // function handleOnDragEnd2(result, index) {
  //   if (!result.destination) return;

  //   const items = Array.from(geodataLayers);
  //   const index = parseInt(result.source.droppableId) - 1;
  //   const [reorderedItem] = items[index]['data'].splice(result.source.index, 1);
  //   items[index]['data'].splice(result.destination.index, 0, reorderedItem);
  //   dispatch({ type: "CHANGE_GEODATA", payload: items });
  // }
  /* END */

  return (
    <>
      <div
        className={`h-[calc(100vh-110px)] w-[330px] min-w-[100px] max-w-[500px] resize-x overflow-auto bg-white`}
      >
        <div id="sidenavSecExample">
          <hr className="my-0" />
          <div>
            <div className="flex h-8 items-center justify-center">
              <p className="text-l h-4 font-bold">Map Settings</p>
            </div>

            <div>
              <ul className="relative px-3">
                <hr className="my-2" />

                <li className="relative">
                  <SidebarToggle
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_RESET_SETTINGS' })
                      setTimeout(
                        () =>
                          dispatch({
                            type: 'RESET_INITIAL_STATE_SETTINGS',
                            payload: props.originalInitialState,
                          }),
                        0
                      )
                    }}
                  >
                    <>
                      <ResetIcon />
                      <span>Reset tool</span>
                    </>
                  </SidebarToggle>
                </li>

                <li className="relative">
                  <SidebarToggle
                    onClick={() =>
                      dispatch({ type: 'TOGGLE_AREA_OF_INTEREST', payload: {} })
                    }
                  >
                    <>
                      <HeartIcon />
                      <span>
                        {areaofInterestStatus2 ? 'Hide' : 'Show'} Area of
                        Interest
                      </span>
                    </>
                  </SidebarToggle>
                </li>
                {/* TOGGLE VULNERABILITY POINTS */}

                <ul>
                  {/* Show vulnerability in sidebar */}
                  <li className="relative">
                    <SidebarToggle
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_VULNERABILITY', payload: {} })
                      }
                    >
                      <>
                        <BottleIcon />
                        <span>
                          {vulnerability ? 'Hide' : 'Show'} Vulnerability
                        </span>
                      </>
                    </SidebarToggle>
                    {vulnerability ? (
                      <ul
                        className="accordion-collapse collapse relative"
                        id="collapseSidenavSecEx2"
                        aria-labelledby="sidenavSecEx2"
                        data-bs-parent="#sidenavSecExample"
                      >
                        <li className="relative">
                          <div className="i flex items-center">
                            <span className="ml-1 px-5 text-sm text-gray-700">
                              Categories
                            </span>
                          </div>
                          <div className="px-6">
                            {/* SHOW HIDE VULNERABILITY ITEMS STYLES */}
                            <DragDropContext
                              onDragEnd={handleOnDragEndCategory}
                            >
                              <Droppable droppableId="categories">
                                {(provided) => (
                                  <ul
                                    className="categories"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {categories.map((val, index) => {
                                      return (
                                        <Draggable
                                          key={val.id}
                                          draggableId={val.id.toString()}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <>
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <div
                                                  className="i flex items-center"
                                                  onClick={() => {
                                                    const newItem = {
                                                      id: val.id,
                                                      slug: val.slug,
                                                      title: val.title,
                                                      status: !val.status,
                                                      color: val.color,
                                                    }
                                                    dispatch({
                                                      type: 'CHANGE_CATEGORIES',
                                                      payload: newItem,
                                                      index_1: index,
                                                    })
                                                    dispatch({
                                                      type: 'CHANGE_ACTIVE_LEGENDS',
                                                      payload: newItem,
                                                    })
                                                  }}
                                                >
                                                  <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                      backgroundColor:
                                                        val.color,
                                                    }}
                                                  ></div>
                                                  <input
                                                    className="focus:ring-3 ml-5 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                                                    id="flowbite"
                                                    aria-describedby="flowbite"
                                                    type="checkbox"
                                                    checked={val.status}
                                                    onChange={(event) => {
                                                      const newItem = {
                                                        id: val.id,
                                                        slug: val.slug,
                                                        title: val.title,
                                                        status: !val.status,
                                                        color: val.color,
                                                      }
                                                      dispatch({
                                                        type: 'CHANGE_CATEGORIES',
                                                        payload: newItem,
                                                        index_1: index,
                                                      })
                                                    }}
                                                  />
                                                  <a
                                                    href="#!"
                                                    className="flex h-6 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4
                                                  pl-2 pr-6 text-xs text-gray-700 transition
                                                  duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="primary"
                                                  >
                                                    {val.title}
                                                  </a>
                                                </div>
                                              </li>
                                              <div
                                                style={{ maxHeight: '10px' }}
                                              >
                                                {provided.placeholder}
                                              </div>
                                            </>
                                          )}
                                        </Draggable>
                                      )
                                    })}
                                  </ul>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                  {/* <li className="relative">
                    <a className="flex items-center text-sm py-6 px-2 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                      onClick={() => dispatch({ type: "TOGGLE_DHS_INDICATOR", payload: {} })}
                    >

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {dhsIndicator == true ? <span>Hide DHS Indicators</span> : <span onClick={() => { onOpenDhsModal() }}>Show DHS Indicators</span>}
                    </a>
                  </li> */}
                  {/* <li className="relative">
                    <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"


                      onClick={() => dispatch({ type: "TOGGLE_DSV_INDICATOR", payload: {} })}
                    >

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>{dsvIndicator == true ? 'Hide DSV Indicators' : 'Show DSV Indicators'}</span>
                    </a>

                    {
                      dsvIndicator == true ?
                        <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                          <li className="relative">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                              onClick={() => { onOpenDsvModal() }}
                            >


                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              <span>Select Data Column</span>
                            </a>
                          </li>
                        </ul>
                        : null
                    }
                  </li> */}
                  {/* removed DRAW AREA OF INTEREST BEFORE ITS IMPLEMENTED */}

                  {/* <li className="relative">       
                    <a className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"
                    //onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Draw Area of Interest</span>
                    </a>
                  </li> */}

                  {/* removed Statistics BEFORE ITS IMPLEMENTED */}
                  {/* <li className="relative">
                  <a className="flex items-center text-sm py-4 px-5 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                  //  onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}

                  >

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Statistics</span>
                  </a>
                </li> */}
                </ul>

                {/* socioeconomic layers in sidebar  */}
                <li className="relative" id="sidenavSecEx3">
                  <a
                    className="flex h-12 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4
                    px-2 text-sm text-gray-700 transition duration-300 ease-in-out
                    hover:bg-blue-50 hover:text-blue-600"
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
                    {socioeconomic.status == true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-5 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0
                            01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-5 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0
                            111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </a>
                  {socioeconomic.status == true && (
                    <div className="relative">
                      <span
                        className="flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded
                        py-4 px-5 text-sm text-gray-700 transition
                        duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                        href="#!"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="primary"
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
                            d="M4 6h16M4 12h8m-8 6h16"
                          />
                        </svg>
                        <span>Select administrative level</span>
                      </span>
                      <ul className="flex">
                        {[
                          {
                            slug: 1,
                            title: 'One',
                          },
                          {
                            slug: 2,
                            title: 'Two',
                          },
                          {
                            slug: 3,
                            title: 'Three',
                          },
                        ].map((val, index) => {
                          return (
                            <div key={index}>
                              <div
                                className="flex"
                                onClick={() => {
                                  dispatch({
                                    type: 'CHANGE_LEVEL',
                                    payload: { level: val.slug },
                                  })
                                }}
                              >
                                <input
                                  className="focus:ring-3  ml-5 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                                  id="flowbite"
                                  aria-describedby="flowbite"
                                  type="radio"
                                  checked={val.slug == level ? true : false}
                                  onChange={() =>
                                    dispatch({
                                      type: 'CHANGE_LEVEL',
                                      payload: { level: val.slug },
                                    })
                                  }
                                />
                                <a
                                  href="#!"
                                  className="flex h-6 items-center  overflow-hidden  text-ellipsis whitespace-nowrap rounded pl-2 text-xs text-gray-700 transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                                  data-mdb-ripple="true"
                                  data-mdb-ripple-color="primary"
                                >
                                  {val.title}
                                </a>
                              </div>
                              <div className="text-gray-700"></div>
                            </div>
                          )
                        })}
                      </ul>
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
                    {socioeconomic.status == true &&
                      socioeconomic.data.map((val, index) => {
                        return (
                          <li className="relative" key={index}>
                            <a
                              href="#!"
                              className=" mt-3 flex h-6 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4
                                        pl-12 pr-6 text-xs font-bold text-gray-700 transition
                                        duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
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
                                                  <a
                                                    href="#!"
                                                    className="flex h-6 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 pl-2
                                                                                          pr-6 text-xs text-gray-700 transition duration-300 ease-in-out
                                                                                          hover:bg-blue-50 hover:text-blue-600"
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
                                                          className="input-sm mx-2 w-14 rounded border border-solid border-gray-300 bg-white bg-clip-padding
                                                                                                            text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white
                                                                                                            focus:text-gray-700 focus:outline-none"
                                                          value={parseInt(
                                                            val2.value
                                                          )}
                                                          onChange={(event) => {
                                                            const newItem = {
                                                              id: val2.id,
                                                              slug: val2.slug,
                                                              title: val2.title,
                                                              status:
                                                                val2.status,
                                                              value:
                                                                event.target
                                                                  .value,
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
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                const newItem =
                                                                  {
                                                                    id: val2.id,
                                                                    slug: val2.slug,
                                                                    title:
                                                                      val2.title,
                                                                    status:
                                                                      val2.status,
                                                                    value:
                                                                      event
                                                                        .target
                                                                        .value,
                                                                    reverse_meaning:
                                                                      val2.reverse_meaning,
                                                                    units:
                                                                      val2.units,
                                                                    json_library:
                                                                      val2.json_library,
                                                                  }
                                                                dispatch({
                                                                  type: 'CHANGE_SOCIOECONOMIC',
                                                                  payload:
                                                                    newItem,
                                                                  index_1:
                                                                    index,
                                                                  index_2:
                                                                    index2,
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
                </li>

                <li className="relative" id="sidenavSecEx3">
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
                                                          value={parseInt(
                                                            val2.value
                                                          )}
                                                          onChange={(event) => {
                                                            const newItem = {
                                                              id: val2.id,
                                                              slug: val2.slug,
                                                              title: val2.title,
                                                              status:
                                                                val2.status,
                                                              value:
                                                                event.target
                                                                  .value,
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
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                const newItem =
                                                                  {
                                                                    id: val2.id,
                                                                    slug: val2.slug,
                                                                    title:
                                                                      val2.title,
                                                                    status:
                                                                      val2.status,
                                                                    value:
                                                                      event
                                                                        .target
                                                                        .value,
                                                                    layer:
                                                                      val2.layer,
                                                                  }
                                                                dispatch({
                                                                  type: 'CHANGE_GEODATA',
                                                                  payload:
                                                                    newItem,
                                                                  index_1:
                                                                    index,
                                                                  index_2:
                                                                    index2,
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
                </li>
              </ul>

              {/* <hr className="my-2" /> */}
            </div>
          </div>
        </div>
      </div>

      <Modal open={dsvModal} onClose={() => onCloseDsvModal()} center>
        <div></div>

        <div className="my-2 max-w-md overflow-y-auto rounded-lg bg-white py-4 px-8 shadow-lg">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Select Columns
          </h2>

          <hr />
          <div>
            {dataColumn.map((val, index) => {
              return (
                <div key={index}>
                  <input
                    className=" focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 px-5 focus:ring-blue-300"
                    type="radio"
                    checked={val.id == selectedDataColumn}
                    onClick={() => {
                      dispatch({ type: 'SELECT_DATA_COLUMN', payload: val.id })
                    }}
                  />

                  <span className="px-2 text-sm text-gray-700"></span>
                  {val.title}
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-block rounded bg-blue-600 px-6 py-2.5 text-sm font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              onClick={() => {
                if (selectedDataColumn == 0) {
                  alert('Select Column First')
                } else {
                  onCloseDsvModal()
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={dhsModal}
        onClose={() => {
          onCloseDhsModal()
          dispatch({
            type: 'CHANGE_ACTIVE_LEGENDS',
            payload: DHS_COLUMN[selectedDhsDataColumn],
          })
        }}
        styles={{
          modal: {
            overflowY: 'visible',
            margin: 'auto',
            maxHeight: '75vh',
            maxWidth: '40vw',
            float: 'left',
            position: 'relative',
            marginLeft: '290px',
            marginTop: '85px',
          },
          overlay: { backgroundColor: 'rgb(0, 0, 0, 0)' },
        }}
      >
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Select DHS Indicator
        </h2>
        <div className="ax-w-md mx-auto rounded-xl bg-white">
          <hr />
          <div
            className="overflow-y-scroll "
            style={{ height: '50vh', width: 'auto' }}
          >
            {dhsDataColumn.map((val, index) => {
              return (
                <div key={index}>
                  <input
                    className="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                    type="radio"
                    checked={val.id == selectedDhsDataColumn}
                    onChange={() => {
                      dispatch({
                        type: 'SELECT_DHS_DATA_COLUMN',
                        payload: val.id,
                      })
                    }}
                  />
                  <span className="px-2 text-xs text-gray-700">{val.Name}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-block rounded bg-blue-600 px-6 py-2.5 text-sm font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              onClick={() => {
                if (selectedDhsDataColumn == 0) {
                  alert('Select Column First')
                } else {
                  onCloseDhsModal()
                  dispatch({
                    type: 'CHANGE_ACTIVE_LEGENDS',
                    payload: DHS_COLUMN[selectedDhsDataColumn],
                  })
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Sidebar
