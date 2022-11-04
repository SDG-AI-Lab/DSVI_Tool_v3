import { useContext, useState, useRef, useEffect } from 'react';
import Control from 'react-leaflet-custom-control'
import { FilterContext } from '../../context/FilterContext';
// import { Modal } from 'react-responsive-modal';
import Dropdown from 'react-dropdown';
import { Carousel } from 'react-responsive-carousel';
import MapControls from './MapControls';
import { Tooltip } from '@mui/material';
import L from 'leaflet';

// options for the drop down menu in infoBox
const dropDownOptions = [
  'Select One', 'SV: Random Forest', 'SV: XGBoost', 'DT: Education Facility', 'DT: Health Institution', 'DT: Financial Service',
  'Population Counts', 'Celltowers', 'Nightlight Intensity', 'Relative Wealth', 'GDP', 'Plant Health', 'Temperature (Max)',
  'Land Use Class', 'Elevation'
]

// each index for the above list has a description in the list below which is shown in infoBox
const dropDownDescriptions = [
  {heading: 'Social Vulnerability Platform', desc: 'Hello and welcome to the DSVI Tool! This tool visualizes Social Vulnerability and Data Relevant for Social Vulnerability in Tajikistan. This is the info box.'},
  {heading: 'SV: Random Forest', desc: 'This is about forests'},
  {heading: 'SV: XGBoost', desc: 'This is about boosting XG'},
  {heading: 'DT: Education Facility', desc: 'This is about forests'},
  {heading: 'DT: Health Institution', desc: 'This is about boosting XG'},
  {heading: 'DT: Financial Service', desc: 'This is about forests'},
  {heading: 'Population Counts', desc: 'This is about boosting XG'},
  {heading: 'Celltowers', desc: 'This is about forests'},
  {heading: 'Nightlight Intensity', desc: 'This is about boosting XG'},
  {heading: 'Relative Wealth', desc: 'This is about forests'},
  {heading: 'GDP', desc: 'This is about boosting XG'},
  {heading: 'Plant Health', desc: 'This is about forests'},
  {heading: 'Temperature (Max)', desc: 'This is about boosting XG'},
  {heading: 'Land Use Class', desc: 'This is about forests'},
  {heading: 'Elevation', desc: 'This is about boosting XG'}
]

const ControlMenu = (props) => {
  const {position, show_infoBox_data, show_data} = props;
  const { state, dispatch } = useContext(FilterContext);
  // const {show_infoBox_data} = state['show_infoBox_data'];
  const [dropdownValue, setDropdownValue] = useState(dropDownOptions[0])
  const [dropdownDescIndex, setDropdownDescIndex] = useState(0)
  const activeLegends = state['activeLegends'];

  // when a drop down option is chosen, to change what the user sees
  function changingDropdown(value) {
    let index = dropDownOptions.indexOf(value);
    setDropdownValue(value);
    setDropdownDescIndex(index);
  }

  const infoBoxRef = useRef();

  useEffect(() => {
    if (infoBoxRef.current) {
      /*Using the wheel will not change the zoom on the map.*/
      L.DomEvent.disableScrollPropagation(infoBoxRef.current);

      /*Dragging is available for infoBax*/
      const draggable = new L.Draggable(infoBoxRef.current);
      draggable.enable();
    }
  });

  if (activeLegends.length > 0 && dropdownValue != activeLegends[activeLegends.length-1].title) {
    const idOfLayer = dropDownOptions.indexOf(activeLegends[activeLegends.length-1].title);

    // console.log("indexOf >>", idOfLayer);
    if (idOfLayer>0) {
      setDropdownValue(activeLegends[activeLegends.length-1].title);
      setDropdownDescIndex(idOfLayer);
      // console.log("dropdownValue >>", dropdownValue);
    }
  }

  return (<> 
    <Control position={position}>
      <div className="border-black flex items-center">
        {/* <svg xmlns="http://www.w3.org/2000/svg"
                className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${show_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch({type: "TOGGLE_SHOW_DATA", payload: {}})
                }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
            </svg> */}

        <Tooltip
          title="Trigger Info Box"
          placement='left-start'
          PopperProps={{
            sx: {
              // right: "10px !important",
              "& .MuiTooltip-tooltip": {
                color: 'black',
                backgroundColor: 'white',
                height: 40,
                borderRadius: '5px',
                fontSize: 12,
                textAlign: 'center',
              }
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 ml-2 cursor-pointer bg-white border-gray-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${show_infoBox_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
            fill="none" viewBox="-2 0 52 44" stroke="currentColor" strokeWidth="2"
            onClick={(e) => {
              // console.log(show_infoBox_data);
              e.stopPropagation();
              e.preventDefault();
              if (show_infoBox_data === false) {
                Array.from(document.getElementsByClassName("info-box")).forEach(e => e.style.display = 'block');
              }
              else {
                Array.from(document.getElementsByClassName("info-box")).forEach(e => e.style.display = "none");
              }
              // console.log('dispatching');

              dispatch({ type: "TOGGLE_INFOBOX_DATA", payload:  {}});

            }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M 39.26,6.74
           C 30.28,-2.25 15.72,-2.25 6.74,6.74
             -2.25,15.72 -2.25,30.28 6.74,39.26
             15.72,48.25 30.28,48.25 39.26,39.26
             48.25,30.28 48.25,15.72 39.26,6.74 Z
           M 26.00,33.00
           C 26.00,34.66 24.66,36.00 23.00,36.00
             21.34,36.00 20.00,34.66 20.00,33.00
             20.00,33.00 20.00,21.00 20.00,21.00
             20.00,19.34 21.34,18.00 23.00,18.00
             24.66,18.00 26.00,19.34 26.00,21.00
             26.00,21.00 26.00,33.00 26.00,33.00 Z
           M 22.95,15.87
           C 21.22,15.87 20.07,14.65 20.10,13.14
             20.07,11.55 21.22,10.37 22.98,10.37
             24.75,10.37 25.86,11.55 25.90,13.14
             25.90,14.65 24.75,15.87 22.95,15.87 Z" />
          </svg>
        </Tooltip>
       
      </div>
    </Control>
    {props.children && <Control position={position}>
      {props.children}
    </Control>}
    <MapControls position={position} />

    { show_infoBox_data && <Control minWidth={442} minHeight={360} position="topleft">
        <div ref={infoBoxRef} className="info-box">
            <button className="button-infoBox" onClick={(e) => {
              // console.log(show_infoBox_data);
              e.stopPropagation();
              e.preventDefault();

              dispatch({ type: "TOGGLE_INFOBOX_DATA", payload: {} })
            }}>x</button>
            <Tabs />
            <Dropdown menuClassName='max-w-11/12 left-4p rounded-xl h-28' 
              controlClassName='rounded-xl w-11/12 m-auto' options={dropDownOptions} 
              onChange={(e) => changingDropdown(e.value)} value={dropdownValue} 
              placeholder="Select an option" />
            <div className='max-w-md px-4 mt-5'>
              <h2 className='font-bold'>{dropDownDescriptions[dropdownDescIndex].heading}</h2>
              <p className='my-3'>{dropDownDescriptions[dropdownDescIndex].desc}</p>
            </div>
          </div>
      </Control>
    }
  </>
  )
}

// the tabs inside the infoBox: Social vulnerability, Data Exploration, and Methods
const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    
    <>
   
      <div className="flex items-start mb-3">
        <ul
          className="nav nav-tabs mr-4 flex w-1/2 list-none flex-col flex-wrap border-b-0 pl-0"
          role="tablist"
        >
          <li
            className="nav-item flex-grow text-left"
            style={{
              background: openTab === 1 ? '#9d969659' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-3 text-xs leading-normal text-black '
              }
              onClick={(e) => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle="tab"
              href="https://sdgailab.org/"
              role="tablist"
            >
              What is Social Vulnerability
            </a>
          </li>
          <li
            className="nav-item flex-grow text-left"
            style={{
              background: openTab === 2 ? '#9d969659' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-3 text-xs leading-normal text-black '
              }
              onClick={(e) => {
                e.preventDefault()
                setOpenTab(2)
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Data Exploration
            </a>
          </li>
          <li
            className="nav-item flex-grow text-left"
            style={{
              background: openTab === 3 ? '#9d969659' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-3 text-xs leading-normal text-black'
              }
              onClick={(e) => {
                e.preventDefault()
                setOpenTab(3)
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Methods
            </a>
          </li>
        </ul>
        <div className="tab-content w-1/2">
          <div className="flex-auto px-2 py-3">
            <div
              className={`${openTab === 1 ? 'block' : 'hidden'
                } tab-pane fade show active`}
              style={{ width: '200px' }}
              id="link1"
            >
              <Carousel
                className="info_carousel"
                showArrows={true}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
              >
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg1.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png"
                  alt="poverty"
                />
              </Carousel>
            </div>
            <div
              className={`${openTab === 2 ? 'block' : 'hidden'
                } tab-pane fade show active`}
              style={{ width: '200px' }}
              id="link2"
            >
              <Carousel
                className="info_carousel"
                showArrows={true}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
              >
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg1.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png"
                  alt="poverty"
                />
              </Carousel>
            </div>
            <div
              className={`${openTab === 3 ? 'block' : 'hidden'
                } tab-pane fade show active`}
              style={{ width: '200px' }}
              id="link3"
            >
              <Carousel
                className="info_carousel"
                showArrows={true}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
              >
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg1.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg2.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png"
                  alt="poverty"
                />
                <img
                  style={{ width: '100px' }}
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg4.png"
                  alt="poverty"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
export default ControlMenu;
