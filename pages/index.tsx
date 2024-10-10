import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import dynamic from 'next/dynamic'
import Sidebar from '../components/sidebar/Sidebar'
import DataSidebar from '../components/controls/Sidebar'
import { reducerInitialState } from '../reducer/reducerInitialState'

const LeafletMap = dynamic(() => import('../components/leaflet/Map'), {
  ssr: false,
})

const Application = () => {
  const { state } = useContext(AuthContext)

  // if (!state.user) return <></>
  return (
    <div className="flex">
      <Sidebar show={true} originalInitialState={reducerInitialState} />
      <LeafletMap />
      <DataSidebar />
    </div>
  )
}

export default Application
