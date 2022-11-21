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
  'Social Vulnerability', 'SV Prediction: Random Forest', 'SV: Prediction: XGBoost', 'Accessibility: Education Facility', 'Accessibility: Health Institution', 'Accessibility: Financial Service',
  'Population Counts', 'Celltowers', 'Nightlight Intensity', 'Relative Wealth', 'GDP', 'Plant Health', 'Temperature (Max)',
  'Land Use Class', 'Elevation'
]

// each index for the above list has a description in the list below which is shown in infoBox
const dropDownDescriptions = [
  {heading: 'Social Vulnerability Platform', 
  desc: 'Social Vulnerability (SV) is the capacity of individuals or communities to cope with social and environmental shocks   (Adger 2000, Cutter 2003). This includes climate change, natural disasters, and other societal risks. Vulnerable groups have a disproportionate risk of being affected and experiencing more profound consequences, due to their socio-economic preconditions. SV assessments help to better map the connection between local conditions, social characteristics, or individual vulnerabilities and risks. The calculation of SV scores is a frequent practice to measure a community’s ability to respond to outside stressors and risks. It is an indirect way to quantify resilience. Having such an assessment helps to understand, get prepared and respond in a more effective manner, using a combination of the most appropriate tools once the risk materializes.'},
  {heading: 'SV Prediction: Random Forest', desc: 'This layer is a prediction of Social Vulnerability with sklearns Random Forest Regressor. A random forest is a meta estimator that fits a number of classifying decision trees on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting. The sub-sample size is controlled with the max_samples parameter if bootstrap=True (default), otherwise the whole dataset is used to build each tree.'},
  {heading: 'SV: Prediction: XGBoost', desc: 'This algorithm builds an additive model in a forward stage-wise fashion; it allows for the optimization of arbitrary differentiable loss functions. In each stage n_classes_ regression trees are fit on the negative gradient of the loss function, e.g. binary or multiclass log loss. Binary classification is a special case where only a single regression tree is induced.'},
  {heading: 'Accessibility: Education Facility', desc: 'This layer shows the time it takes to drive an individual to the next available Education Facility. The data was provided by OpenStreetMap. The download source is humdata.org'},
  {heading: 'Accessibility: Health Institution', desc: 'This layer shows the time it takes to drive an individual to the next available Health Facility. The data was provided by OpenStreetMap. The download source is humdata.org'},
  {heading: 'Accessibility: Financial Service', desc: 'This layer shows the time it takes to drive an individual to the next available Financial Facility. The data was provided by OpenStreetMap. The download source is humdata.org'},
  {heading: 'Population Counts', desc: 'The population data is by: https://sedac.ciesin.columbia.edu/data/collection/gpw-v4'},
  {heading: 'Celltowers', desc: 'Celltower data is by: '},
  {heading: 'Nightlight Intensity', desc: 'Nightlight Intensity'},
  {heading: 'Relative Wealth', desc: 'This is about forests'},
  {heading: 'GDP', desc: 'This is about boosting XG'},
  {heading: 'Plant Health', desc: 'This is about forests'},
  {heading: 'Temperature (Max)', desc: 'This is about boosting XG'},
  {heading: 'Land Use Class', desc: 'This is about forests'},
  {heading: 'Elevation', desc: 'This is about boosting XG'}
];

const InfoBox = (props) => {
  const {position} = props;
  const { state, dispatch } = useContext(FilterContext);
  const show_infoBox_data = state['show_infoBox_data'];
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

  useEffect(() => {
    setDropdownValue(dropDownOptions[0]);
    setDropdownDescIndex(0);
  }, [activeLegends]);

  if (activeLegends.length > 0 && dropdownValue != activeLegends[activeLegends.length-1].title) {
    const idOfLayer = dropDownOptions.indexOf(activeLegends[activeLegends.length-1].title);

    // console.log("indexOf >>", idOfLayer);
    if (idOfLayer>0) {
      setDropdownValue(activeLegends[activeLegends.length-1].title);
      setDropdownDescIndex(idOfLayer);
      // console.log("dropdownValue >>", dropdownValue);
    }
  }

  return (
      <Control minWidth={360} minHeight={460} position={position}>
        <div ref={infoBoxRef} className="info-box">
        {show_infoBox_data ?
          <div>
            <h2 className='font-bold text-xl mb-3 ml-3'>Information Panel</h2>
            <hr className= 'mb-3'></hr>
            <button className="button-infoBox" onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              dispatch({ type: "TOGGLE_INFOBOX_DATA", payload: {} })
            }}>x</button>
            <Tabs />
            <Dropdown menuClassName='max-w-11/12 left-4p rounded-xl h-50' 
              controlClassName='rounded-xl w-11/12 m-auto' options={dropDownOptions} 
              onChange={(e) => changingDropdown(e.value)} value={dropdownValue} 
              placeholder="Select an option" />
            <div className='max-w-md px-4 mt-5 square'>
              {/* <h2 className='font-bold'>{dropDownDescriptions[dropdownDescIndex].heading}</h2> */}
              {/* <p className='my-3 leading-relaxed mb-3 text-justify'>{dropDownDescriptions[dropdownDescIndex].desc}</p> */}
              <div>
                {dropDownDescriptions[dropdownDescIndex].img && <img
                  style={{ width: '100px' }}
                  src={dropDownDescriptions[dropdownDescIndex].img}
                  alt="poverty"
                /> }
              </div>  
              <p className='my-3 leading-relaxed mb-3 text-justify'>{dropDownDescriptions[dropdownDescIndex].desc}</p>
          </div>
        </div>

        : null }
        </div>
      </Control>
  )
}

// the tabs inside the infoBox: Social vulnerability, Data Exploration, and Methods

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    
    <>
   
      <div className="flex items-start mb-3">
        <ul
          className="nav nav-tabs mr-1 flex list-none flex-col flex-wrap border-b-0 pl-0"
          role="tablist"
        >
          <li
            className="nav-item flex-grow text-left"
            style={{
              background: openTab === 1 ? '#e6f9ff' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-1 text-base leading-normal text-black '
              }
              onClick={(e) => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle="tab"
              href="https://sdgailab.org/"
              role="tablist"
            >
              Social Vulnerability
            </a>
          </li>
          <li
            className="nav-item flex-grow text-left"
            style={{
              background: openTab === 2 ? '#e6f9ff' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-1 text-base leading-normal text-black '
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
              background: openTab === 3 ? '#e6f9ff' : 'transparent',
            }}
          >
            <a
              className={
                'block rounded px-5 py-1 text-base leading-normal text-black'
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
        <div className="tab-content">
          <div className="flex-auto ml-20">
            <div
              className={`${openTab === 1 ? 'block' : 'hidden'
                } tab-pane fade show active`}
              style={{ width: '150px' }}
              id="link1"
            >
              <Carousel
                className="info_carousel"
                showArrows={false}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
              >
                <img
                  style={{ width: '100px'}}
                  src="./images/logo-sdg-filled.png"
                  alt="poverty"
                />
                {/* <img
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
                /> */}
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
                showArrows={false}
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
              style={{ width: '150px' }}
              id="link3"
            >
              <Carousel
                className="info_carousel"
                showArrows={false}
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
export default InfoBox;
