import React from 'react'
import CustomPolygon from '../controls/CustomPolygon'
import { Polygon } from 'react-leaflet'
import L from 'leaflet'
import { DataReducerInitialStateType } from '../../reducer/reducer'

export type LayerObjectType = {
  id: number
  json_library: string
  reverse_meaning: boolean
  slug: string
  status: true
  title: string
  units: string
  value: number
}

export const useMapFunctions = (show_data: boolean) => {
  const mapPolygonColorToDensity = (
    normalizeData: number,
    layerObject: LayerObjectType
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

  const newProjection = (
    full_JSON_library,
    library,
    index: number,
    layerObject: LayerObjectType
  ): JSX.Element => {
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
      _avg,
    } = library.properties
    const {} = library.name
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
    // console.log('onlyAllMeanNumbers');
    // console.log(onlyAllMeanNumbers);
    const minMeanNumber = Math.min(...onlyAllMeanNumbers)
    const maxMeanNumber = Math.max(...onlyAllMeanNumbers)

    const normalizeDataValue = Math.abs(
      (_mean - minMeanNumber) / (maxMeanNumber - minMeanNumber)
    )
    const fillColor = mapPolygonColorToDensity(normalizeDataValue, layerObject)

    return (
      <CustomPolygon
        key={index}
        positions={L.GeoJSON.coordsToLatLngs(
          library.geometry.coordinates[0][0]
        )}
        fillColor={fillColor}
        hoverColor={fillColor}
        opacity={layerObject.value / 100}
        tooltipDirection="auto"
        tooltipOffset={[20, 0]}
        tooltipCount={library.properties._mean.toFixed(2)} // library.properties._count
        normalizeDataValue={normalizeDataValue.toFixed(2)}
        units={layerObject.units}
        _mean={_mean.toFixed(2)}
        minMeanNumber={minMeanNumber.toFixed(2)}
        maxMeanNumber={maxMeanNumber.toFixed(2)}
        tooltipName_1={library.properties.NAME_1}
        tooltipName_2={library.properties.NAME_2}
        tooltipName_3={library.properties.NAME_2}
        tooltipBgcolor="rgb(255 255 255)"
        tooltipTextColor="text-slate-700"
        show_data={show_data}
        popupMaxWidth="auto"
        popupMaxHeight="auto"
        popupBgColor="rgb(255 255 255)"
        popupTextColor="text-slate-700"
        data={data}
      />
    )
  }

  const layersData = (state: DataReducerInitialStateType) => {
    const se_xgboost = state.socioeconomic.data
      .find((x) => x.slug === 'se_social_vulnerability')
      ?.data.find((x) => x.slug === 'se_xgboost')

    const se_random_forest = state.socioeconomic.data
      .find((x) => x.slug === 'se_social_vulnerability')
      ?.data.find((x) => x.slug === 'se_random_forest')

    const se_random_forest_status = se_random_forest?.status
    const se_random_forest_value = se_random_forest?.value

    const se_education_facility = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_education_facility')

    const se_education_facility_status = se_education_facility?.status
    const se_education_facility_value = se_education_facility?.value

    const se_health_institution = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_health_institution')

    const se_health_institution_status = se_health_institution?.status
    const dt_health_institution_value = se_health_institution?.value

    const se_financial_service = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_financial_service')

    const se_financial_service_status = se_financial_service?.status
    const se_financial_service_value = se_financial_service?.value

    return {
      se_xgboost,
      se_random_forest_status,
      se_random_forest_value,
      se_random_forest,
      se_education_facility,
      se_education_facility_status,
      se_education_facility_value,
      se_health_institution,
      se_health_institution_status,
      dt_health_institution_value,
      se_financial_service,
      se_financial_service_status,
      se_financial_service_value,
    }
  }

  return { newProjection, layersData }
}
