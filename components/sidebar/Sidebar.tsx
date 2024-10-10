import React, { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import { FilterContext } from '../../context/FilterContext'
import DHS_COLUMN from '../../public/static/color_gradient_lookup.json'
import SidebarToggle from './SidebarToggle'
import VulnerabilityOptions from './VulnerabilityOptions'
import SocioeconLayers from './SocioeconLayers'
import HighResLayers from './HighResLayers'
import { AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai'
import { PiArrowsCounterClockwiseBold } from 'react-icons/pi'
import SelectCountry from './SelectCountry'

const Sidebar = (props) => {
  const { state, dispatch } = useContext(FilterContext)
  const areaofInterestStatus2 = state['show_area_of_interest']

  const dataColumn = state['data_column']
  const dhsDataColumn = state['dhs_data_column']
  const selectedDataColumn = state['selected_data_column']
  const selectedDhsDataColumn = state['selected_dhs_data_column']
  const { show_infoBox_data } = state

  const [dsvModal, setDsvModal] = useState(false)
  const [dhsModal, setDhsModal] = useState(false)
  const onCloseDsvModal = () => setDsvModal(false)
  const onCloseDhsModal = () => setDhsModal(false)

  /* COMMENT #1 (AT THE BOTTOM OF THE FILE) WAS HERE */

  useEffect(() => {
    dispatch({ type: 'FETCH_DHS_COLUMN', payload: DHS_COLUMN })
  }, [])

  // COMMENT #2 (AT THE BOTTOM OF THE FILE) WAS HERE

  return (
    <>
      <div
        className={`h-[calc(100vh-110px)] w-[330px] min-w-[100px] max-w-[500px] resize-x overflow-auto bg-white`}
        id="sidenavSecExample"
      >
        <div>
          <hr className="my-0" />
          <div className="flex h-8 items-center justify-center">
            <p className="text-l h-4 font-bold">Map Settings</p>
          </div>
          <hr className="my-2" />

          <ul className="relative px-3">
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
                  <PiArrowsCounterClockwiseBold className="mr-2 h-4 w-4" />
                  <span>Reset tool</span>
                </>
              </SidebarToggle>
            </li>

            <li className="relative">
              <SidebarToggle
                onClick={() => dispatch({ type: 'TOGGLE_INFOBOX_DATA' })}
              >
                <>
                  <AiOutlineInfoCircle className="mr-2" />
                  <span>{show_infoBox_data ? 'Hide' : 'Show'} Infobox</span>
                </>
              </SidebarToggle>
            </li>

            <li>{/* <SelectCountry /> */}</li>

            <li className="relative">
              <SidebarToggle
                onClick={() => dispatch({ type: 'TOGGLE_AREA_OF_INTEREST' })}
              >
                <>
                  <AiOutlineHeart className="mr-2 h-4 w-4" />
                  <span>
                    {areaofInterestStatus2 ? 'Hide' : 'Show'} Area of Interest
                  </span>
                </>
              </SidebarToggle>
            </li>
            {/* TOGGLE VULNERABILITY POINTS */}
            <VulnerabilityOptions />
            {/* socioeconomic layers in sidebar  */}

            <li>
              <SocioeconLayers />
            </li>

            <li className="relative" id="sidenavSecEx3">
              <HighResLayers />
            </li>
          </ul>
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
                  <span className="px-2 text-xs text-gray-700">
                    {val.title}
                  </span>
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

// COMMENT #1

// const { show_infoBox_data } = props
// const socioeconomic = state['socioeconomic']
// const level = state['level']
// const show_sidebar = state['show_sidebar']
// const reset_settings = state['reset_settings']
// const categories = state['categories']
// const socioEconomicLayers = state['socioeconomic']['data']
// const activeLegends = state['activeLegends']
// const vulnerability = state['vulnerability']
// const dsvIndicator = state['dsv_indicator']
// const dhsIndicator = state['dhs_indicator']
// const drawofInterestStatus = state['draw_area_of_interest']
// const statisticsStatus = state['statistics']
// const geodataLayers = state['geodata']['data']
// const onOpenDsvModal = () => setDsvModal(true)
// const onOpenDhsModal = () => setDhsModal(true)
// function handleOnDragEnd(result) {
//   if (!result.destination) return
//   const items = Array.from(socioEconomicLayers)
//   const [reorderedItem] = items.splice(result.source.index, 1)
//   items.splice(result.destination.index, 0, reorderedItem)
//   dispatch({ type: 'CHANGE_SOCIOECONOMIC', payload: items })
// }
// function handleOnDragEndCategory(result) {
//   if (!result.destination) return
//   const items = Array.from(categories)
//   const [reorderedItem] = items.splice(result.source.index, 1)
//   items.splice(result.destination.index, 0, reorderedItem)
//   dispatch({ type: 'CHANGE_CATEGORIES', payload: items })
// }

// COMMENT #2:
// /* PLS NOT USE */
// function handleOnDragEnd2(result, index) {
//   if (!result.destination) return;

//   const items = Array.from(geodataLayers);
//   const index = parseInt(result.source.droppableId) - 1;
//   const [reorderedItem] = items[index]['data'].splice(result.source.index, 1);
//   items[index]['data'].splice(result.destination.index, 0, reorderedItem);
//   dispatch({ type: "CHANGE_GEODATA", payload: items });
// }
// /* END */
