import React, { useState, useContext } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../components/sidebar/Sidebar'
import DataSidebar from '../components/controls/Sidebar'
import { FilterContext } from '../context/FilterContext'
import Image from 'next/image'
import bg from '../public/images/launch-background.jpeg'
import sdgFilled from '/public/images/logo-sdg-filled.png'
import marker1 from '../public/images/marker1.png'
import undpWhite from '/public/images/logo-undp-white.png'
import sdgAiLab from '/public/images/logo-sdg-ai-lab-black-alpha.png'
import { reducerInitialState } from '../reducer/reducerInitialState'

const LeafletMap = dynamic(() => import('../components/leaflet/Map'), {
  ssr: false,
})

const Application = () => {
  // const [location, setLocation] = useState({lng: 38.917275, lat: 71.014469}) // 38.917275, 71.014469
  const { state, dispatch } = useContext(FilterContext)
  const on_homepage = state['on_homepage']

  const [firstState, setFirstState] = useState(reducerInitialState)
  const originalInitialState = firstState
  on_homepage

  return (
    <>
      {on_homepage ? (
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="flex h-screen flex-col bg-cover bg-no-repeat pl-16 pr-16 text-white"
        >
          <div className="content-center text-center font-bold">
            <h1>DSVI Tool Tajikistan</h1>{' '}
            <p>
              This tool is a collaboration between SDG AI Lab, UN Online
              Volunteers and UNDP Tajikistan
            </p>
          </div>
          <div className="flex shrink grow basis-0 flex-row items-center">
            <div className="basis-1/3">
              <Image src={sdgFilled} alt="Logo" width={300} height={300} />
            </div>
            <div className="basis-1/3 text-center">
              <button
                onClick={() =>
                  dispatch({ type: 'QUIT_HOMEPAGE', payload: false })
                }
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Launch tool
              </button>
            </div>
            <div className="basis-1/3">
              <p>TEXT</p>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div>
              <Image src={marker1} alt="Logo" width={90} height={100} />
            </div>
            <div>
              <Image src={undpWhite} alt="Logo" width={50} height={100} />
            </div>
            <div>
              <Image src={sdgAiLab} alt="Logo" width={100} height={100} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <Sidebar show={true} originalInitialState={originalInitialState} />
          {/*pass show_infoBox_data parameter from reducer + control menu props */}
          <LeafletMap
          // center={location}
          // location={location}
          // draggable={false}
          // title="testing"
          // onDragMarker={(e) => {
          //     let loc = {lat: e.lat, lng: e.lng};
          //     setLocation(loc);
          // }}
          />
          <DataSidebar />
        </div>
      )}
    </>
  )
}

export default Application
