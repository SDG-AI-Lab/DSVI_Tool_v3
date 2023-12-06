import { useEffect, useContext } from 'react'
import { useMap } from 'react-leaflet'
import { FilterContext } from '../../context/FilterContext'

export default function UpdateMap() {
  const map = useMap()
  const { map_settings, country } = useContext(FilterContext).state

  useEffect(() => {
    // if (reset_settings) {
    map.setView(map_settings.latlong, map_settings.zoom)
    // }
  }, [country])

  return null
}
