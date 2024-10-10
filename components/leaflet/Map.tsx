import React, { Fragment, useContext, useEffect } from 'react'
import {
  MapContainer,
  LayersControl,
  WMSTileLayer,
  ZoomControl,
  ScaleControl,
  Pane,
} from 'react-leaflet'
import styles from './Map.module.scss'
import { FilterContext } from '../../context/FilterContext'
import CircleMarkers from '../marker/CircleMarkers'
import CircleMarkersVulnerability from '../marker/CircleMarkersVulnerability'
import AOI from '../../public/static/tajikistan/AOI.json'
import BetterWMSTileLayer from '../controls/BetterWMSTileLayer'
import NewLegend_2 from '../controls/NewLegend_2'
import MapControls from '../controls/MapControls'
import InfoBox from '../controls/InfoBox'
import { useMapFunctions } from './useMapFunctions'
import AOIprojection from '../controls/AOIprojection'
import NewProjection from '../controls/NewProjection'
import UpdateMap from './UpdateMap'

export const geoServerUrl =
  'http://sdg-geoserver.ddns.net:8080/geoserver/sdg-ai-lab/wms'
// 'https://sdg-geoserver.ddns.net:8443/geoserver/sdg-ai-lab/wms'
// export const geoServerUrl = 'http://localhost:8080/geoserver/sdg-ai-lab/wms'

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
        let geojson /*: set type of geojson*/ = geojson1
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
      const { status, layer, style, value } = layerData

      if (status) {
        if (layerData.slug === 'sv_roads') {
          return (
            <WMSTileLayer
              key={layer}
              params={{
                layers: layer,
                format: 'image/png',
                transparent: true,
                version: '1.1.0',
              }}
              url={geoServerUrl}
              zIndex={9999}
              opacity={value / 100}
            />
          )
        } else {
          return (
            <Fragment key={layer}>
              <BetterWMSTileLayer
                url={geoServerUrl}
                layers={layer}
                styles={style}
                opacity={value / 100}
              />
              {layerData.slug === 'sv_distance_to_edu' && (
                <WMSTileLayer
                  params={{
                    layers: 'sdg-ai-lab:edu_single_point',
                    format: 'image/png',
                    transparent: true,
                    version: '1.1.0',
                  }}
                  url={geoServerUrl}
                  zIndex={9999}
                  opacity={value / 100}
                />
              )}
            </Fragment>
          )
        }
      }
    })
  }

  const displayAreaOfInterest = () => {
    if (!show_area_of_interest) return
    return AOI.features.map((feature, index) => {
      return <AOIprojection key={index} geojsonFeature={feature} />
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
      style={{ zIndex: 1 }} // for Dropdown in TopBar.tsx
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
