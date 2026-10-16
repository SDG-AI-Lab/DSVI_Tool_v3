import React, { useContext, useEffect } from 'react'
import {
  MapContainer,
  LayersControl,
  WMSTileLayer,
  ZoomControl,
  ScaleControl,
  useMap,
  Pane,
} from 'react-leaflet'
import styles from './Map.module.scss'
import { FilterContext } from '../../context/FilterContext'
import CircleMarkers from '../marker/CircleMarkers'
import CircleMarkersVulnerability from '../marker/CircleMarkersVulnerability'
import AOI from 'public/static/AOI.geojson'
import HighResRasterLayer from '../controls/HighResRasterLayer'
import NewLegend_2 from '../controls/NewLegend_2'
import MapControls from '../controls/MapControls'
import InfoBox from '../controls/InfoBox'
import { useMapFunctions } from './useMapFunctions'
import AOIprojection from '../controls/AOIprojection'
import NewProjection from '../controls/NewProjection'

const OsmMap = () => {
  const { state } = useContext(FilterContext)

  const {
    level,
    reset_settings,
    map_settings,
    tile_providers,
    show_area_of_interest,
    activeLegends,
    show_data,
    dhs_indicator,
  } = state
  const { seLayersData, svLayersData, categoriesData } = useMapFunctions()

  const se = seLayersData(state)
  const sv = svLayersData(state)

  const cats = categoriesData(state)
  const seStatuses = se.map((x) => x.layerInfo.status)
  const svStatuses = sv.map((x) => x.status)

  function UpdateMap() {
    const map = useMap()
    useEffect(() => {
      if (reset_settings) {
        map.setView(map_settings.latlong, map_settings.zoom)
      }
    }, [reset_settings])

    return null
  }

  useEffect(() => {
    if (activeLegends.length > 0) {
      let elements = Array.from(
        document.getElementsByClassName('leaflet-interactive')
      )
      for (let element of elements) {
        if (activeLegends[activeLegends.length - 1].slug.indexOf('se_') === 0) {
          if (element.classList.contains('turn-off-vector-layers-pointer')) {
            element.classList.remove('turn-off-vector-layers-pointer')
          }
          element.classList.add('turn-on-vector-layers-pointer')
        }
        if (activeLegends[activeLegends.length - 1].slug.indexOf('sv_') === 0) {
          if (element.classList.contains('turn-on-vector-layers-pointer')) {
            element.classList.remove('turn-on-vector-layers-pointer')
          }
          element.classList.add('turn-off-vector-layers-pointer')
        }
      }

      // Fixing the Map attribution
      let containerBottomRight =
        document.getElementsByClassName('leaflet-right')
      containerBottomRight[1].classList.add('container-bottom-right')
      containerBottomRight[1].children[0].classList.add(
        'attribution-control-keep-bottom'
      )
    }
  }, [activeLegends])

  const displaySeLayers = () => {
    return se.map((combinedLayer) => {
      const { status } = combinedLayer.layerInfo
      const [geojson1, geojson2, geojson3] = combinedLayer.geojson

      if (status) {
        let geojson: SingleGeoJson = geojson1
        if (level === 2) {
          geojson = geojson2
        } else if (level === 3) {
          geojson = geojson3
        }
        return geojson.features.map((feature, index) => {
          return (
            <NewProjection
              key={index}
              full_JSON_library={geojson1}
              geojsonFeature={feature}
              layerObject={combinedLayer.layerInfo}
            />
          )
        })
      }
    })
  }

  const displaySvLayers = () => {
    return sv.map((layerData) => {
      const { status, slug, title, colors, value } = layerData

      if (status) {
        return (
          <HighResRasterLayer
            key={slug}
            slug={slug}
            title={title}
            colors={colors}
            opacity={value / 100}
          />
        )
      }
    })
  }

  const displayAreaOfInterest = () => {
    if (!show_area_of_interest) return
    return AOI.features.map((feature, index) => {
      return (
        <AOIprojection key={index} geojsonFeature={feature} index={index} />
      )
    })
  }

  return (
    <MapContainer
      center={map_settings.latlong}
      zoom={map_settings.zoom}
      zoomControl={false}
      // scrollWheelZone={true}
      className={styles.container}
      attributionControl={true}
    >
      <UpdateMap />

      <LayersControl position="topright">
        {!reset_settings &&
          tile_providers.map(({ name, checked, args }) => (
            <LayersControl.BaseLayer {...{ name, checked }} key={name}>
              <WMSTileLayer {...{ ...args }} />
            </LayersControl.BaseLayer>
          ))}
      </LayersControl>
      <ScaleControl />
      <ZoomControl position="bottomleft" />

      <MapControls position="topright" />
      <InfoBox position="topleft" />

      {activeLegends.length ? <NewLegend_2 /> : null}

      <Pane name="area-of-interest-pane" style={{ zIndex: 200 }}>
        {displayAreaOfInterest()}
      </Pane>

      <Pane name="socioeconomic-pane" style={{ zIndex: 201 }}>
        {displaySeLayers()}
      </Pane>

      <Pane name="geodata-pane" style={{ zIndex: 201 }}>
        {displaySvLayers()}
      </Pane>

      <CircleMarkers />
      <CircleMarkersVulnerability />
    </MapContainer>
  )
}
export default OsmMap
