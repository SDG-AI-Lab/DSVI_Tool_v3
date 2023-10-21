import { useContext, useRef, useEffect } from 'react'
import Control from 'react-leaflet-custom-control'
import { FilterContext } from '../../context/FilterContext'
import InfoBoxTabs from './InfoBoxTabs'
import L from 'leaflet'

type InfoBoxProps = {
  position: L.ControlPosition
}

export default function InfoBox({ position }: InfoBoxProps) {
  const { state, dispatch } = useContext(FilterContext)
  const show_infoBox_data = state['show_infoBox_data']

  // when a drop down option is chosen, to change what the user sees

  const infoBoxRef = useRef()
  useEffect(() => {
    if (infoBoxRef.current) {
      /*Using the wheel will not change the zoom on the map.*/
      L.DomEvent.disableScrollPropagation(infoBoxRef.current)

      /*Dragging is available for infoBax*/
      const draggable = new L.Draggable(infoBoxRef.current)
      draggable.enable()
    }
  })

  if (!show_infoBox_data) return <></>

  return (
    <Control position={position}>
      <div ref={infoBoxRef} className="info-box">
        <div>
          <h2 className="mb-3 ml-3 text-xl font-bold">Information Panel</h2>
          <hr className="mb-3"></hr>
          <button
            className="button-infoBox"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              dispatch({ type: 'TOGGLE_INFOBOX_DATA', payload: {} })
            }}
          >
            x
          </button>
          <InfoBoxTabs />
        </div>
      </div>
    </Control>
  )
}

// the tabs inside the infoBox: Social vulnerability, Data Exploration, Methods, and How to use

// const InfoDiv = (props) => {
//   return (
//     <>
//       <Dropdown
//         menuClassName="max-w-11/12 left-4p rounded-xl h-50"
//         controlClassName="rounded-xl w-11/12 m-auto"
//         options={dropDownOptions}
//         onChange={(e) => props.changingDropdown(e.value)}
//         onClick={props.setTab(2)}
//         value={props.dropdownValue}
//         placeholder="Select an option"
//       />
//       <div className="square mt-5 max-w-md px-4">
//         {/* <h2 className='font-bold'>{dropDownDescriptions[dropdownDescIndex].heading}</h2> */}
//         {/* <p className='my-3 leading-relaxed mb-3 text-justify'>{dropDownDescriptions[dropdownDescIndex].desc}</p> */}
//         <div>
//           {dropDownDescriptions[props.dropdownDescIndex].img && (
//             <img
//               style={{ width: '100px' }}
//               src={dropDownDescriptions[props.dropdownDescIndex].img}
//               alt="poverty"
//             />
//           )}
//         </div>
//         <p className="my-3 mb-3 text-justify leading-relaxed">
//           {dropDownDescriptions[props.dropdownDescIndex].desc}
//         </p>
//       </div>
//     </>
//   )
// }
