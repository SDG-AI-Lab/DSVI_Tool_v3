import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import dynamic from 'next/dynamic'
import Sidebar from '../components/sidebar/Sidebar'
import DataSidebar from '../components/controls/Sidebar'
import { reducerInitialState } from '../reducer/reducerInitialState'
import { useAuth } from '../components/hooks/useAuth'
import { toast } from 'react-toastify'

const LeafletMap = dynamic(() => import('../components/leaflet/Map'), {
  ssr: false,
})

const Application = () => {
  const { protectedRoute } = useAuth()
  protectedRoute()

  const { state } = useContext(AuthContext)
  if (!state.isAuthenticated) {
    return <></>
  } else {
    return (
      <div className="flex">
        <Sidebar show={true} originalInitialState={reducerInitialState} />

        <LeafletMap />
        <DataSidebar />
      </div>
    )
  }
}

export default Application
