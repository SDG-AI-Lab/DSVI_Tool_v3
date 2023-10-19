import React from 'react'
import CustomPolygon from './CustomPolygon'
import { SeLayerObjectType } from '../../reducer/reducerInitialState'
import L from 'leaflet'

type NewProjectionProps = {
  full_JSON_library: SingleGeoJson
  geojsonFeature: GeoJsonFeaturesType
  index: number
  layerObject: SeLayerObjectType
  show_data: boolean
}

export default function NewProjection({
  full_JSON_library,
  geojsonFeature,
  index,
  layerObject,
  show_data,
}: NewProjectionProps) {
  const {
    NAME,
    NAME_1,
    NAME_2,
    _mean,
    _count,
    _stdev,
    _max,
    _min,
    _sum,
    // _avg may not exist on geojson at all?!!!
    // _avg,
  } = geojsonFeature.properties

  const data = [
    // These are shown when the user clicks on the polygon
    {
      key: 'Oblast',
      value: NAME_1,
    },
    {
      key: 'District',
      value: NAME_2,
    },
    {
      key: 'Count',
      value: _count,
    },
    {
      key: 'Mean value',
      value: _mean,
    },
  ]
  const onlyAllMeanNumbers = full_JSON_library.features.map(
    (object) => object.properties._mean
  )

  const minMeanNumber = Math.min(...onlyAllMeanNumbers)
  const maxMeanNumber = Math.max(...onlyAllMeanNumbers)

  const normalizeDataValue = Math.abs(
    (_mean - minMeanNumber) / (maxMeanNumber - minMeanNumber)
  )

  const mapPolygonColorToDensity = (
    normalizeData: number,
    layerObject: SeLayerObjectType
  ): string => {
    if (!layerObject.reverse_meaning) {
      switch (true) {
        case normalizeData > 0.8 && normalizeData <= 1:
          return '#FF362C' // RED
        case normalizeData > 0.6:
          return '#ff962c' // ORANGE
        case normalizeData > 0.4:
          return '#FFDE2C' // YELLOW
        case normalizeData > 0.2:
          return '#00800A' // GREEN
        case normalizeData >= 0:
          return '#0c58ca' // BLUE
        default:
          return '#FFFFFF' // WHITE
      }
    } else {
      switch (true) {
        case normalizeData > 0.8 && normalizeData <= 1:
          return '#0c58ca' // BLUE
        case normalizeData > 0.6:
          return '#00800A' // GREEN
        case normalizeData > 0.4:
          return '#FFDE2C' // YELLOW
        case normalizeData > 0.2:
          return '#ff962c' // ORANGE
        case normalizeData >= 0:
          return '#FF362C' // RED
        default:
          return '#FFFFFF' // WHITE
      }
    }
  }

  const fillColor = mapPolygonColorToDensity(normalizeDataValue, layerObject)

  return (
    <CustomPolygon
      positions={L.GeoJSON.coordsToLatLngs(
        geojsonFeature.geometry.coordinates[0][0]
      )}
      fillColor={fillColor}
      hoverColor={fillColor}
      opacity={layerObject.value / 100}
      tooltipDirection="auto"
      tooltipOffset={[20, 0]}
      tooltipName_1={geojsonFeature.properties.NAME_1}
      tooltipName_2={geojsonFeature.properties.NAME_2}
      tooltipTextColor="text-slate-700"
      units={layerObject.units}
      _mean={_mean.toFixed(2)}
    />
  )
}
