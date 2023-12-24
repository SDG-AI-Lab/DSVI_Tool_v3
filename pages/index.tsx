import React from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../components/sidebar/Sidebar'
import DataSidebar from '../components/controls/Sidebar'
import { reducerInitialState } from '../reducer/reducerInitialState'
import { useAuth } from '../components/hooks/useAuth'

const LeafletMap = dynamic(() => import('../components/leaflet/Map'), {
  ssr: false,
})

const Application = () => {
  const { protectedRoute } = useAuth()
  protectedRoute()
  return (
    <div className="flex">
      <Sidebar show={true} originalInitialState={reducerInitialState} />
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
  )
}

export default Application
