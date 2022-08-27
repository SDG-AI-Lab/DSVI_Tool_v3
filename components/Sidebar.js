import { useState, useContext, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FilterContext } from '../context/FilterContext'

const Sidebar = () => {

  const { state, dispatch } = useContext(FilterContext);
  const level = state["level"];

  const show_sidebar = state["show_sidebar"];
  const areaofInterestStatus2 = state["show_area_of_interest"];
  const socioeconomic = state["socioeconomic"];
  const geodata = state["geodata"];
  const vulnerability = state["vulnerability"];
  const categories = state["categories"];
  const dsvIndicator = state["dsv_indicator"];
  const dataColumn = state["data_column"];
  const dhsIndicator = state["dhs_indicator"];
  const dhsDataColumn = state["dhs_data_column"];
  const drawofInterestStatus = state["draw_area_of_interest"];
  const statisticsStatus = state["statistics"];
  const selectedDataColumn = state["selected_data_column"];
  const selectedDhsDataColumn = state["selected_dhs_data_column"];


  const socioEconomicLayers = state["socioeconomic"]["data"];
  const geodataLayers = state["geodata"]["data"];
  const [dsvModal, setDsvModal] = useState(false);
  const [dhsModal, setDhsModal] = useState(false);
  const onOpenDsvModal = () => setDsvModal(true);
  const onCloseDsvModal = () => setDsvModal(false);
  const onOpenDhsModal = () => setDhsModal(true);
  const onCloseDhsModal = () => setDhsModal(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(socioEconomicLayers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: items })
  }

  function handleOnDragEndCategory(result) {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "CHANGE_CATEGORIES", payload: items });
  }

  function handleOnDragEnd2(result) {
    if (!result.destination) return;
    const items = Array.from(geodataLayers);
    const index = parseInt(result.source.droppableId) - 1;
    const [reorderedItem] = items[index]['data'].splice(result.source.index, 1);
    items[index]['data'].splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "CHANGE_GEODATA", payload: items });
  }

  return (
    <>
      <div className={`bg-white h-[calc(100vh-164px)] w-[250px] min-w-[250px] overflow-auto`}>

        <div id="sidenavSecExample">
          <div>
          </div>
            <hr className="my-0" />
            <div>
            <div className='flex items-center justify-center h-8'>
              <p className='text-gray-700 h-2'>Main Menu</p>
            </div>
            <hr className="my-2" />
            <div>

              <ul className="relative px-1">
                <li><p></p></li>
                <li className="relative">
                  <span className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden 
                    text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 
                    hover:bg-blue-50 transition duration-300 ease-in-out" 
                    href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <span>Select administrative level</span>
                  </span>

                  <ul className="flex">
                    {
                      [{
                        slug: 1,
                        title: 'One'
                      },
                      {
                        slug: 2,
                        title: 'Two'
                      },
                      {
                        slug: 3,
                        title: 'Three'
                      }].map((val, index) => {
                        return (
                          <div key={index}>
                            <div className="flex" onClick={() => { dispatch({ type: "CHANGE_LEVEL", payload: { level: val.slug } }) }}>
                              <input className="ml-5  bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="radio"
                                checked={val.slug == level ? true : false}
                                onChange={() => dispatch({ type: "CHANGE_LEVEL", payload: { level: val.slug } })}
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
                </li>
                <hr className="my-2" />
                <li className="relative">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden 
                    text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 
                    hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"
                    onClick={() => dispatch({ type: "TOGGLE_AREA_OF_INTEREST", payload: {} })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{areaofInterestStatus2 == true ? 'Hide Area of Interest' : 'Show Area of Interest'}</span>
                  </a>
                </li>
                
                <li className="relative" id="sidenavSecEx3">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis 
                    whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 
                    ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" 
                    data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-expanded="false" 
                    aria-controls="collapseSidenavSecEx2"
                    onClick={() => dispatch({ type: "TOGGLE_SOCIOECONOMIC", payload: {} })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" 
                      stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 
                        0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Socioeconomic Layers</span>
                    {
                      socioeconomic.status == true ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 
                            111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 
                            01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    }
                  </a>
                  <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" 
                    data-bs-parent="#sidenavSecExample">
                      {
                          socioeconomic.status == true && socioeconomic.data.map((val, index) => {
                              return (
                                  <li className="relative" key={index}>
                                      <a href="#!" className=" mt-3 flex font-bold items-center text-xs py-4 pl-12 pr-6 h-6 
                                        overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 
                                        hover:bg-blue-50 transition duration-300 ease-in-out"
                                                          data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>
                                      <DragDropContext onDragEnd={handleOnDragEnd2}>
                                          <Droppable droppableId={val.id.toString()}>
                                              {(provided) => (
                                                  <ul className={val.id} {...provided.droppableProps} ref={provided.innerRef}>
                                                      {
                                                        val.data && val.data.map((val2, index2) => {
                                                              return (
                                                                  <Draggable key={val2.id} draggableId={val2.id.toString()} index={index2}>
                                                                      {(provided) => (
                                                                          <>
                                                                              <li className="relative" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                  <div className="flex i items-center"
                                                                                      onClick={() => {
                                                                                          const newItems = [...socioeconomic.data];
                                                                                          newItems[index]['data'][index2] = {
                                                                                              id: val2.id,
                                                                                              slug: val2.slug,
                                                                                              title: val2.title,
                                                                                              status: !val2.status,
                                                                                              value: val2.value
                                                                                          };
                                                                                          dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems })
                                                                                      }}
                                                                                  >
                                                                                      <input className="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                                                                                          id="flowbite" aria-describedby="flowbite" type="checkbox"
                                                                                          checked={val2.status}
                                                                                          onChange={(event) => {
                                                                                              const newItems = [...socioeconomic.data];
                                                                                              newItems[index]['data'][index2] = {
                                                                                                  id: val2.id,
                                                                                                  slug: val2.slug,
                                                                                                  title: val2.title,
                                                                                                  status: !val2.status,
                                                                                                  value: val2.value
                                                                                              };
                                                                                              dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems })
                                                                                          }}
                                                                                      />
                                                                                      <a href="#!" className="flex items-center text-xs py-4 pl-2 pr-6 h-6 overflow-hidden text-gray-700 
                                                                                          text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition 
                                                                                          duration-300 ease-in-out"
                                                                                          data-mdb-ripple="true" data-mdb-ripple-color="primary">{val2.title}</a>
                                                                                  </div>
                                                                                  {
                                                                                    val2.status == true ?
                                                                                        <div className="flex flex-col space-y-2 p-2">
                                                                                            <div className="px-6">
                                                                                                <span className="text-gray-700 text-sm">opacity:
                                                                                                    <input
                                                                                                        type="number"
                                                                                                        className="mx-2 w-14 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                                                                                                            border-gray-300 rounded transition ease-in-out input-sm focus:text-gray-700 focus:bg-white 
                                                                                                            focus:border-blue-600 focus:outline-none"
                                                                                                        value={parseInt(val2.value)}
                                                                                                        onChange={(event) => {
                                                                                                            const newItems = [...socioeconomic.data];
                                                                                                            newItems[index]['data'][index2] = {
                                                                                                                id: val2.id,
                                                                                                                slug: val2.slug,
                                                                                                                title: val2.title,
                                                                                                                status: val2.status,
                                                                                                                value: event.target.value
                                                                                                            };
                                                                                                            dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems })
                                                                                                        }}
                                                                                                    />
                                                                                                    <div>
                                                                                                        <div>
                                                                                                            <input type="range" min="1" max="100" step="1" value={val2.value} className="form-range h-6 p-0 
                                                                                                                focus:outline-none focus:ring-0 focus:shadow-none"
                                                                                                                onChange={(event) => {
                                                                                                                    const newItems = [...socioeconomic.data];
                                                                                                                    newItems[index]['data'][index2] = {
                                                                                                                        id: val2.id,
                                                                                                                        slug: val2.slug,
                                                                                                                        title: val2.title,
                                                                                                                        status: val2.status,
                                                                                                                        value: event.target.value
                                                                                                                    };
                                                                                                                    dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems })
                                                                                                                }}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        : null
                                                                                  }
                                                                              </li>
                                                                          </>
                                                                      )}
                                                                  </Draggable>
                                                              )
                                                          })
                                                      }
                                                  </ul>
                                              )}
                                          </Droppable>
                                      </DragDropContext>
                                  </li>
                              )
                          })
                      }
                  </ul>
                </li>
                <li className="relative" id="sidenavSecEx3">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis 
                    whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" 
                    data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx3" 
                    aria-expanded="false" aria-controls="collapseSidenavSecEx3"
                    onClick={() => dispatch({ type: "TOGGLE_GEODATA", payload: {} })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Geodata Layers</span>
                    {
                      geodata.status == true ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    }
                  </a>
                  <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" 
                    data-bs-parent="#sidenavSecExample">
                    {
                      geodata.status == true && geodata.data.map((val, index) => {
                        return (
                          <li className="relative" key={index}>
                            <a href="#!" className=" mt-3 flex font-bold items-center text-xs py-4 pl-12 pr-6 h-6 
                              overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded 
                              hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" 
                              data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>

                            <DragDropContext onDragEnd={handleOnDragEnd2}>
                              <Droppable droppableId={val.id.toString()}>
                                {(provided) => (
                                  <ul className={val.id} {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                      val.data && val.data.map((val2, index2) => {
                                        return (
                                          <Draggable key={val2.id} draggableId={val2.id.toString()} index={index2}>
                                            {(provided) => (
                                              <>
                                                <li className="relative" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                  <div className="flex i items-center"
                                                    onClick={() => {
                                                      const newItems = [...geodata.data];
                                                      newItems[index]['data'][index2] = {
                                                        id: val2.id,
                                                        slug: val2.slug,
                                                        title: val2.title,
                                                        status: !val2.status,
                                                        value: val2.value
                                                      };
                                                      dispatch({ type: "CHANGE_GEODATA", payload: newItems })
                                                    }}
                                                  >
                                                    <input className="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" 
                                                      id="flowbite" aria-describedby="flowbite" type="checkbox"
                                                      checked={val2.status}
                                                      onChange={(event) => {
                                                      const newItems = [...geodata.data];
                                                      newItems[index]['data'][index2] = {
                                                          id: val2.id,
                                                          slug: val2.slug,
                                                          title: val2.title,
                                                          status: !val2.status,
                                                          value: val2.value
                                                      };
                                                      dispatch({ type: "CHANGE_GEODATA", payload: newItems })
                                                      }}
                                                    />
                                                    <a href="#!" className="flex items-center text-xs py-4 pl-2 pr-6 h-6 
                                                      overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded 
                                                      hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" 
                                                      data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                                      {val2.title}
                                                    </a>
                                                  </div>
                                                  {
                                                    val2.status == true ?
                                                      <div className="flex flex-col space-y-2 p-2">
                                                        <div className="px-6">
                                                          <span className="text-gray-700 text-sm">opacity:
                                                            <input
                                                              type="number"
                                                              className="mx-2 w-14 text-base font-normal text-gray-700 bg-white 
                                                                bg-clip-padding border border-solid border-gray-300 rounded transition 
                                                                ease-in-out input-sm focus:text-gray-700 focus:bg-white focus:border-blue-600 
                                                                focus:outline-none"
                                                              value={parseInt(val2.value)}
                                                              onChange={(event) => {
                                                                const newItems = [...geodata.data];
                                                                newItems[index]['data'][index2] = {
                                                                  id: val2.id,
                                                                  slug: val2.slug,
                                                                  title: val2.title,
                                                                  status: val2.status,
                                                                  value: event.target.value
                                                                };
                                                                dispatch({ type: "CHANGE_GEODATA", payload: newItems })
                                                              }}
                                                            />
                                                            <div>
                                                              <div>
                                                                <input type="range" min="1" max="100" step="1" value={val2.value} 
                                                                  className="form-range h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
                                                                  onChange={(event) => {
                                                                    const newItems = [...geodata.data];
                                                                    newItems[index]['data'][index2] = {
                                                                      id: val2.id,
                                                                      slug: val2.slug,
                                                                      title: val2.title,
                                                                      status: val2.status,
                                                                      value: event.target.value
                                                                    };
                                                                    dispatch({ type: "CHANGE_GEODATA", payload: newItems })
                                                                  }}
                                                                />
                                                              </div>
                                                            </div>
                                                          </span>
                                                        </div>
                                                      </div>
                                                      : null
                                                  }
                                                </li>
                                              </>
                                            )}
                                          </Draggable>
                                        )
                                      })
                                    }
                                  </ul>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              </ul>
              <hr className="my-2" />

              <ul>
                <li className="relative">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"
                    onClick={() => dispatch({ type: "TOGGLE_VULNERABILTY", payload: {} })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span>{vulnerability == true ? 'Hide Vulnerabilty' : 'Show Vulnerabilty'}</span>
                  </a>
                  {
                    vulnerability == true ?
                      <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                        <li className="relative">
                          <div className="flex i items-center ">
                            <span className="text-gray-700 px-2 text-sm ml-3">
                              Categories
                            </span>
                          </div>
                          <div className="px-6">

                            <DragDropContext onDragEnd={handleOnDragEndCategory}>

                              <Droppable droppableId="categories">
                                {(provided) => (
                                  <ul className="categories" {...provided.droppableProps} ref={provided.innerRef}>
                                    {categories.map((val, index) => {
                                      return (

                                        <Draggable key={val.id} draggableId={val.id.toString()} index={index}>
                                          {(provided) => (
                                            <>
                                              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                <div className="flex i items-center">
                                                  <div className="text-red-400">{ }</div>
                                                  <input className="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox"
                                                    defaultChecked={false}
                                                    checked={val.status}
                                                    onClick={() => {
                                                      const newItems = [...categories];
                                                      newItems[index] = {
                                                        id: val.id,
                                                        slug: val.slug,
                                                        title: val.title,
                                                        status: !val.status

                                                      };
                                                      dispatch({ type: "CHANGE_CATEGORIES", payload: newItems });
                                                    }}
                                                  />
                                                  <a href="#!" className="flex items-center text-xs py-4 pl-2 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>
                                                </div>
                                              </li>
                                              <div style={{ maxHeight: "10px" }}>{provided.placeholder}</div>
                                            </>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                  </ul>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        </li>
                      </ul>
                      : null
                  }
                </li>

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

                <li className="relative">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"


                    onClick={() => dispatch({ type: "TOGGLE_DHS_INDICATOR", payload: {} })}
                  >

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>{dhsIndicator == true ? 'Hide DHS Indicators' : 'Show DHS Indicators'}</span>
                  </a>

                  {
                    dhsIndicator == true ?
                      <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" data-bs-parent="#sidenavSecExample">
                        <li className="relative">
                          <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                            onClick={() => { onOpenDhsModal() }}
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


                </li>

                <li className="relative">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                  //onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}

                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>

                    <span>Draw Area of Interest</span>
                  </a>
                </li>

                <li className="relative">
                  <a className="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                  //  onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}

                  >

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Statistics</span>
                  </a>
                </li>
              </ul>

            </div>
          </div>



        </div >

      </div >
      <Modal open={dsvModal}
        onClose={
          () => {

            onCloseDsvModal()
          }
        }

        center>
        <div></div>

        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-2 overflow-y-auto ">

          <div>
            <h2 className="text-gray-800 text-2xl font-semibold mb-3">Select Columns</h2>

            <hr />
            {
              dataColumn.map((val, index) => {
                return (
                  <div key={index}>
                    <input className=" px-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" type="radio"

                      checked={val.id == selectedDataColumn}

                      onClick={() => {
                        dispatch({ type: "SELECT_DATA_COLUMN", payload: val.id });

                      }}


                    />

                    <span className="px-2 text-gray-700 text-sm"></span>  {val.title}</div>
                )
              })
            }

          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

              onClick={() => {

                if (selectedDataColumn == "0") {
                  alert("Select Column First")

                }
                else {
                  onCloseDsvModal()
                }

              }}

            >Apply</button>

          </div>
        </div>
      </Modal>

      <Modal open={dhsModal}
        onClose={
          () => {

            onCloseDhsModal()
          }
        }
        styles={{modal: {overflowY: 'hidden', margin: 'auto', maxHeight: '95vh'}}}

        center>

        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-2 overflow-y-auto">

          <div className="overflow-y-scroll" style={{height: '75vh'}}>
            <h2 className="text-gray-800 text-2xl font-semibold mb-3">Select Columns</h2>

            <hr />
            {
              dhsDataColumn.map((val, index) => {
                return (
                  <div key={index}>
                    <input className=" px-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" type="radio"

                      checked={val.id == selectedDhsDataColumn}

                      onClick={() => {
                        dispatch({ type: "SELECT_DHS_DATA_COLUMN", payload: val.id });

                      }}


                    />

                    <span className="px-2 text-gray-700 text-sm"></span>  {val.title}</div>
                )
              })
            }

          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

              onClick={() => {

                if (selectedDhsDataColumn == "0") {
                  alert("Select Column First")

                }
                else {
                  onCloseDhsModal()
                }

              }}


            >Apply</button>

          </div>
        </div>
      </Modal>
    </>
  )

}
export default Sidebar;
