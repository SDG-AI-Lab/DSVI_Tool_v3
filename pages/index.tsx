import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import dynamic from 'next/dynamic'
import Sidebar from '../components/sidebar/Sidebar'
import DataSidebar from '../components/controls/Sidebar'
import { reducerInitialState } from '../reducer/reducerInitialState'
import { useAuth } from '../components/hooks/useAuth'

const LeafletMap = dynamic(() => import('../components/leaflet/Map'), {
  ssr: false,
})

const Application = () => {
  const { state } = useContext(AuthContext)
  const { protectedRoute } = useAuth()
  protectedRoute()

  if (!state.user) return <></>
  return (
    <div className="flex">
      <Sidebar show={true} originalInitialState={reducerInitialState} />
      <LeafletMap />
      <DataSidebar />
    </div>
  )
}

export default Application
