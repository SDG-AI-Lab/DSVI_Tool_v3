import React, { Fragment, useContext, useEffect } from 'react'
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
import BetterWMSTileLayer from '../controls/BetterWMSTileLayer'
import NewLegend_2 from '../controls/NewLegend_2'
import MapControls from '../controls/MapControls'
import InfoBox from '../controls/InfoBox'
import { useMapFunctions } from './useMapFunctions'

const defaultMap = { lat: 22.167057857886153, lng: 79.6728515625, zoom: 5 }

// export const geoServerUrl = 'http://3.136.245.50:8080/geoserver/sdg-ai-lab/wms'
export const geoServerUrl = 'http://localhost:8080/geoserver/sdg-ai-lab/wms'

const OsmMap = () => {
  const { state, dispatch } = useContext(FilterContext)

  const level = state['level']
  const reset_settings = state['reset_settings']
  const map_settings = state['map_settings']
  const tile_providers = state['tile_providers']

  const show_data = state['show_data']
  const show_area_of_interest = state['show_area_of_interest']

  const activeLegends = state['activeLegends']
  const dhsIndicator = state['dhs_indicator']

  const {
    newProjection,
    seLayersData,
    svLayersData,
    categoriesData,
    AOI_projection,
  } = useMapFunctions()

  const se = seLayersData(state)

  const sv = svLayersData(state)

  const cats = categoriesData(state)
  const seStatuses = se.map((x) => x.layerInfo.status)
  const svStatuses = sv.map((x) => x.status)

  const showLegend =
    seStatuses.some((x) => x === true) ||
    svStatuses.some((x) => x === true) ||
    dhsIndicator ||
    cats.some((x) => x === true)

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
        if (level === 1) {
          return geojson1.features.map((library, index) => {
            return newProjection(
              geojson1,
              library,
              index,
              combinedLayer.layerInfo,
              show_data
            )
          })
        } else if (level === 2) {
          return geojson2.features.map((library, index) => {
            return newProjection(
              geojson2,
              library,
              index,
              combinedLayer.layerInfo,
              show_data
            )
          })
        } else {
          return geojson3.features.map((library, index) => {
            return newProjection(
              geojson3,
              library,
              index,
              combinedLayer.layerInfo,
              show_data
            )
          })
        }
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
                //style: "sdg-ai-lab:xgboost",
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
                    //style: "sdg-ai-lab:xgboost",
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

      {showLegend ? <NewLegend_2 /> : null}

      <Pane name="area-of-interest-pane" style={{ zIndex: 200 }}>
        {show_area_of_interest &&
          AOI.features.map((library, index) => {
            return AOI_projection(library, index)
          })}
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
