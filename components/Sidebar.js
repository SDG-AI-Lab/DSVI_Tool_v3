import { useState, useContext } from "react";
import { Modal } from 'react-responsive-modal';
//import SidebarExternalMenu from './SidebarExternalMenu';
import TopBar from './Topbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FilterContext } from '../context/FilterContext'

const Sidebar = () => {

  const { state, dispatch } = useContext(FilterContext);

  const show_sidebar = state["show_sidebar"];
  const areaofInterestStatus2 = state["show_area_of_interest"];
  const socioeconomicStatus2 = state["socioeconomic"];
  const geodata = state["geodata"];
  const vulnerability = state["vulnerability"];
  const categories = state["categories"];
  const dsvIndicator = state["dsv_indicator"];
  const dataColumn = state["data_column"];
  const drawofInterestStatus = state["draw_area_of_interest"];
  const statisticsStatus = state["statistics"];
  const selectedDataColumn = state["selected_data_column"];


  const socioEconomicLayers = state["socioeconomic"]["data"];
  const geodataLayers = state["geodata"]["data"];
  

  const [sidebarButton, setSidebarButton] = useState(1);
  const [areaofInterestStatus, setAreaofInterestStatus] = useState(false);

  const [vulnerabilityStatus, setVulnerabiltyStatus] = useState(false);

  const [socioEconomicLayersStatus, setScioEconomicLayersStatus] = useState(false);
  const [geodataLayersStatus, setGeodataLayersStatus] = useState(false);
  const [dsvIndicatorStatus, setDsvIndicatorStatus] = useState(false);
  const [drawofInterestStatus2, setDrawofInterestStatus] = useState(false);
  const [statisticsStatus2, setStatisticsStatus] = useState(false);


  const [dsvModal, setDsvModal] = useState(false);

  const onOpenDsvModal = () => setDsvModal(true);
  const onCloseDsvModal = () => setDsvModal(false);




  const [categories2, setCategories] = useState(
    [
      {
        id: 1,
        title: "Very Low",
        slug: 'very_low',
        color: 'bg-lime-500',
        status: true
      },
      {
        id: 2,
        title: "Low",
        slug: 'low',
        color: 'bg-green-500',
        status: true
      },
      {
        id: 3,
        title: "Middle",
        slug: 'middle',
        color: 'bg-yellow-500',
        status: true
      },
      {
        id: 4,
        title: "High",
        slug: 'high',
        color: 'bg-orange-500',
        status: true
      },
      {
        id: 5,
        title: "Very High",
        slug: 'very_high',
        color: 'bg-red-500',
        status: true
      },

    ]
  );

  const [socioEconomicLayers2, setSocioEconomicLayers] = useState([
    {
      id: 1,
      slug: 'realtive_wealth_district',
      title: 'Relative Wealth: District',
      status: false,
      value: 60
    },
    {
      id: 2,
      slug: 'gdp_ppp',
      title: 'GDP / PPP',
      status: false,
      value: 60
    },
    {
      id: 3,
      slug: 'health_care_institutions',
      title: 'Health Care Institutions',
      status: false,
      value: 60
    },
    {
      id: 4,
      slug: 'sv_ground_truth',
      title: 'SV: Ground Truth',
      status: false,
      value: 60
    },
    {
      id: 5,
      slug: 'financial_institutions',
      title: 'Financial Institutions',
      status: false,
      value: 60
    },
    {
      id: 6,
      slug: 'population_density',
      title: 'Population Density',
      status: false,
      value: 60
    },
    {
      id: 7,
      slug: 'educational_facilities',
      title: 'Educational Facilities',
      status: false,
      value: 60
    },
    {
      id: 8,
      slug: 'population_density_mask',
      title: 'Population Density Mask',
      status: false,
      value: 60
    },
    {
      id: 9,
      slug: 'built_environment',
      title: 'Built Environment',
      status: false,
      value: 60
    },
    {
      id: 10,
      slug: 'disaster_count',
      title: 'Disaster Count',
      status: false,
      value: 60
    },



  ]);

  const [geodataLayers2, setGeodataLayers] = useState([
    {
      id: 1,
      slug: 'distance_maps',
      title: 'Distance Maps',
      data: [
        {
          id: 1.1,
          slug: 'distance_maps',
          title: 'Distance Maps',
          status: false
        },
        {
          id: 1.2,
          slug: 'distance_to_healthcare',
          title: 'Distance to Healthcare',
          status: false
        },
        {
          id: 1.3,
          slug: 'distance_to_coast',
          title: 'Distance to Coast',
          status: false
        },
        {
          id: 1.4,
          slug: 'distance_to_finance',
          title: 'Distance to Finance',
          status: false


        }
      ]
    },
    {
      id: 2,
      slug: 'bio_physical',
      title: 'Bio Physical',
      data: [
        {
          id: 2.1,
          slug: 'Elevation',
          title: 'Elevation',
          status: false
        },
        {
          id: 2.2,
          slug: 'max_temp',
          title: 'Max Temp',
          status: false
        },
        {
          id: 2.3,
          slug: 'plant_health',
          title: 'Plant Health',
          status: false
        }
      ]
    },
    {
      id: 3,
      slug: 'socio_economic',
      title: 'Socio Economic',
      data: [
        {
          id: 3.1,
          slug: 'sv_prediction',
          title: 'SV_Prediction',
          status: false
        },
        {
          id: 3.2,
          slug: 'nightlight_int',
          title: 'Nightlight Int',
          status: false
        },
        {
          id: 3.3,
          slug: 'pop_density',
          title: 'Pop. Density',
          status: false
        },
        {
          id: 3.4,
          slug: 'roads_lines',
          title: 'Roads (lines)',
          status: false
        },
        {
          id: 3.5,
          slug: ' healthsites_points',
          title: 'Healthsites (points)',
          status: false
        },
        {
          id: 3.6,
          slug: 'relative_wealth',
          title: 'Relative Wealth',
          status: false
        },
      ]
    }
  ]);



  const [selectedDataColumn2, setSelectedDataColumn] = useState(0);

  const [dataColumn2, setDataColumn] = useState([
    {
      id: 1,
      slug: 'Main floor material',
      title: 'Main floor material',
      status: false
    },
    {
      id: 2,
      slug: 'Number of household members (listed)',
      title: 'Number of household members (listed)',
      status: false
    },
    {
      id: 3,
      slug: 'Frequency of listening to radio',
      title: 'Frequency of listening to radio',
      status: false
    },
    {
      id: 4,
      slug: 'Age of household head',
      title: 'Age of household head',
      status: false
    },
    {
      id: 5,
      slug: 'Time to get to water source',
      title: 'Time to get to water source',
      status: false
    },
    {
      id: 6,
      slug: 'Beating justified if wife goes out without telling husband',
      title: 'Beating justified if wife goes out without telling husband',
      status: false
    },
    {
      id: 7,
      slug: 'Getting medical help for self: distance to health facility',
      title: 'Getting medical help for self: distance to health facility',
      status: false
    },

    {
      id: 8,
      slug: 'Wealth index combined',
      title: 'Wealth index combined',
      status: false
    },
    {
      id: 9,
      slug: 'How often uses internet',
      title: 'How often uses internet',
      status: false
    },
    {
      id: 10,
      slug: 'Annual_Precipitation_2000',
      title: 'Annual_Precipitation_2000',
      status: false
    },
    {
      id: 11,
      slug: 'Aridity_2000',
      title: 'Aridity_2000',
      status: false
    },
    {
      id: 12,
      slug: 'BUILT_Population_1990',
      title: 'BUILT_Population_1990',
      status: false
    },

    {
      id: 13,
      slug: 'Annual_Precipitation_2010',
      title: 'Annual_Precipitation_2010',
      status: false
    },
    {
      id: 14,
      slug: 'BUILT_Population_2014',
      title: 'BUILT_Population_2014',
      status: false
    },
    {
      id: 15,
      slug: 'Day_Land_Surface_Temp_2015',
      title: 'Day_Land_Surface_Temp_2015',
      status: false
    },
    {
      id: 16,
      slug: 'Day_Land_Surface_Temp_2005',
      title: 'Day_Land_Surface_Temp_2005',
      status: false
    }
  ]
  );

  function handleOnDragEnd(result) {
    if (!result.destination) return;
console.log("es"+JSON.stringify(result));
    const items = Array.from(socioEconomicLayers);
    console.log("2"+JSON.stringify(items));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("3"+JSON.stringify(items));
   // setSocioEconomicLayers(items);
    dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: items })
  }

  function handleOnDragEndCategory(result) {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "CHANGE_CATEGORIES", payload: items });
    //setCategories(items);
  }

  function handleOnDragEnd2(result) {

    console.log("result" + JSON.stringify(result));
    if (!result.destination) return;

    const items = Array.from(geodataLayers);

    const index = parseInt(result.source.droppableId) - 1;
    const [reorderedItem] = items[index]['data'].splice(result.source.index, 1);
    items[index]['data'].splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: "CHANGE_GEODATA", payload: items });
  }

  return (

    <>


      <div className="flex justify-center self-center items-center my-2 ">



        <button
          className={show_sidebar == true ? 'rounded-3xl bg-white border-2 border-blue-700 px-5 py-2 flex' : 'rounded-3xl bg-white border-2 border-black px-5 py-2 flex'}
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", payload: {} })}
        >


          <svg xmlns="http://www.w3.org/2000/svg" className={show_sidebar == true ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>

          <span className={show_sidebar == true ? 'px-2 text-blue-700' : 'px-2'}>
            Map Filters


          </span>
        </button>
       
      </div>


      <div
        className={` top-0 left-0 w-[18vw]   text-white fixed h-full z-40  ease-in-out duration-300 ${show_sidebar ? "-translate-x-0 " : "-translate-x-full"
          }`}
      >
        <div class=" w-60  h-full shadow-md bg-white absolute" id="sidenavSecExample">


          <div className="absolute -right-10 object-center top-1/2 z-20">
            {
              /**
               * 
               *   <SidebarExternalMenu />
               */
            }
          
          </div>

          <div className=" overflow-y-auto h-screen ">

            <div class="pt-4 pb-2 px-4 ">
              <a href="#!">
                <div class="flex items-center">


                  <div class="shrink-0">
                    <img src="/images/sdglogodark.jpg" class="rounded-full w-20" alt="Avatar" />

                  </div>
                  <div class="grow ml-3">
                    <p class="text-sm font-semibold text-blue-600"> DSVI Tajikistan Development Tool


                      <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", payload: {} })}

                        className=" absolute -right-6 z-20 bg-white p-2 border-2 rounded-full h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>


                    </p>



                  </div>


                </div>
              </a>
            </div>
            <hr className="p-2 m-2" />
            <div className="">
              <ul class="relative px-1 ">
                <li class="relative">
                  <a class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                    // onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}
                    onClick={() => dispatch({ type: "TOGGLE_AREA_OF_INTEREST", payload: {} })}

                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{areaofInterestStatus2 == true ? 'Hide Area of Interest' : 'Show Area of Interest'}</span>
                  </a>
                </li>


                <a class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-expanded="false" aria-controls="collapseSidenavSecEx2"

                  //  onClick={() => setScioEconomicLayersStatus(!socioEconomicLayersStatus)}
                 
                  onClick={() => dispatch({ type: "TOGGLE_SOCIOECONOMIC", payload: {} })}
                >


                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span>Socioeconomic Layers</span>

                  {
                    socioeconomicStatus2.status == true ?

                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>

                      :

                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                  }




                </a>

                {
                  socioeconomicStatus2.status == true ?
                    <DragDropContext onDragEnd={handleOnDragEnd}>

                      <Droppable droppableId="socioeconomiclayer">
                        {(provided) => (
                          <ul className="socioeconomiclayer" {...provided.droppableProps} ref={provided.innerRef}>
                            {socioeconomicStatus2.data.map((val, index) => {
                              return (

                                <Draggable key={val.id} draggableId={val.id.toString()} index={index}>
                                  {(provided) => (
                                    <>
                                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                        <div class="flex i items-center">
                                          <input class="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox"
                                            checked={val.status}
                                            onClick={() => {
                                              const newItems = [...socioeconomicStatus2.data];
                                              newItems[index] = {
                                                id: val.id,
                                                slug: val.slug,
                                                title: val.title,
                                                status: !val.status,
                                                value: val.value

                                              };
                                              dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems })
                                              // setSocioEconomicLayers(newItems);
                                            }}


                                          />
                                          <a href="#!" class="flex items-center text-xs py-4 pl-2 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>
                                        </div>


                                        {
                                          val.status && val.status == true ?
                                            <div class="flex flex-col space-y-2 p-2 w-80">
                                              <div className="px-6">
                                                <span className="text-gray-700 text-sm">opacity:

                                                  <input
                                                    type="number"
                                                    class="mx-2 w-14 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out
input-sm
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
                                                    id="exampleNumber0"
                                                    value={parseInt(val.value)}

                                                    onChange={(event) => {
                                                      const newItems = [...socioeconomicStatus2.data];
                                                      newItems[index] = {
                                                        id: val.id,
                                                        slug: val.slug,
                                                        title: val.title,
                                                        status: val.status,
                                                        value: event.target.value

                                                      };
                                                      dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems });
                                                      // setSocioEconomicLayers(newItems);
                                                    }}

                                                  />

                                                  <input type="range" class="w-full" min="1" max="100" step="1" value={val.value}

                                                    onChange={(event) => {
                                                      const newItems = [...socioeconomicStatus2.data];
                                                      newItems[index] = {
                                                        id: val.id,
                                                        slug: val.slug,
                                                        title: val.title,
                                                        status: val.status,
                                                        value: event.target.value

                                                      };
                                                      dispatch({ type: "CHANGE_SOCIOECONOMIC", payload: newItems });
                                                      // setSocioEconomicLayers(newItems);
                                                    }}
                                                    className=" form-range
h-6
p-0
focus:outline-none focus:ring-0 focus:shadow-none"/>

                                                </span>
                                              </div>

                                            </div>
                                            : null
                                        }








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
                    :
                    null
                }





                <li class="relative" id="sidenavSecEx3">
                  <a class="flex items-center text-sm mt-2 py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx3" aria-expanded="false" aria-controls="collapseSidenavSecEx3"


                    // onClick={() => setGeodataLayersStatus(!geodataLayersStatus)}
                    onClick={() => dispatch({ type: "TOGGLE_GEODATA", payload: {} })}
                  >


                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Geodata Layers</span>





                    {
                      geodata.status == true ?

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-16" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>

                        :

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-16" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                    }





                  </a>
                  <ul class="relative accordion-collapse collapse" id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" data-bs-parent="#sidenavSecExample">

                    {
                      geodata.status == true && geodata.data.map((val, index) => {
                        return (
                          <li class="relative">
                            <a href="#!" class=" mt-3 flex font-bold items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>

                            <DragDropContext onDragEnd={handleOnDragEnd2}>
                              <Droppable droppableId={val.id}>
                                {(provided) => (

                                  <ul className={val.id} {...provided.droppableProps} ref={provided.innerRef}>

                                    {
                                      val.data && val.data.map((val2, index2) => {
                                        return (

                                          <Draggable key={val2.id} draggableId={val2.id.toString()} index={index2}>
                                            {(provided) => (

                                              <>
                                                <li class="relative" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                  <div class="flex i items-center">
                                                    <input class="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox"


                                                      checked={val2.status}
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


                                                    />
                                                    <a href="#!" class="flex items-center text-xs py-4 pl-2 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val2.title}</a>
                                                  </div>


                                                  {
                                                    val2.status && val2.status == true ?
                                                      <div class="flex flex-col space-y-2 p-2 w-80">
                                                        <div className="px-6">

                                                                                                                    <span className="text-gray-700 text-sm">opacity:

                                                            <input
                                                              type="number"
                                                              class="mx-2 w-14 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out
        input-sm
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  "
                                                              id="exampleNumber0"
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
                                                            <input type="range" class="w-full" min="1" max="100" step="1" value={val2.value} className=" form-range
  h-6
  p-0
  focus:outline-none focus:ring-0 focus:shadow-none"


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
              <hr class="my-2" />

              <li class="relative">
                <a class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"
 onClick={() => dispatch({ type: "TOGGLE_VULNERABILTY", payload: {} })}
                 

                >


                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span>{vulnerability == true ? 'Hide Vulnerabilty' : 'Show Vulnerabilty'}</span>
                </a>

                {
                  vulnerability == true ?
                    <ul class="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                      <li class="relative">
                        <div class="flex i items-center ">
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

                                              <div class="flex i items-center">
                                                <div className="text-red-400">{}</div>
                                                <input class="ml-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox"
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
                                                <a href="#!" class="flex items-center text-xs py-4 pl-2 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">{val.title}</a>
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




              <li class="relative">
                <a class="mt-2 flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                 
                  onClick={() => dispatch({ type: "TOGGLE_DSV_INDICATOR", payload: {} })}
                >

                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>{dsvIndicator == true ? 'Hide DSV Indicators' : 'Show DSV Indicators'}</span>
                </a>

                {
                  dsvIndicator == true ?
                    <ul class="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                      <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                          onClick={() => { onOpenDsvModal() }}
                        >


                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                          <span>Select Data Column</span>
                        </a>
                      </li>
                    </ul>
                    : null
                }


              </li>



              <li class="relative">
                <a class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                //onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}

                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>

                  <span>Draw Area of Interest</span>
                </a>
              </li>


              <li class="relative">
                <a class="flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary"

                //  onClick={() => setAreaofInterestStatus(!areaofInterestStatus)}

                >

                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Statistics</span>
                </a>
              </li>








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

        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-2 overflow-y-auto ">

          <div>
            <h2 class="text-gray-800 text-2xl font-semibold mb-3">Select Columns</h2>

            <hr />
            {
              dataColumn.map((val, index) => {
                return (
                  <div>
                    <input class=" px-5 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" type="radio"

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
          <div class="flex justify-end mt-4">
            <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

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
    </>





















  )

}
export default Sidebar;