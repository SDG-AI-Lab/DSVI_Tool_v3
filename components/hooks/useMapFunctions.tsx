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

  const seLayersData = (state: DataReducerInitialStateType) => {
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

    const se_socio_economic = state.socioeconomic.data.find(
      (x) => x.slug === 'se_socio_economic'
    )
    const se_population_counts = se_socio_economic?.data.find(
      (e) => e.slug === 'se_population_counts'
    )
    const se_population_counts_status = se_population_counts?.status
    const se_population_counts_value = se_population_counts?.value

    const se_celltowers = se_socio_economic?.data.find(
      (e) => e.slug === 'se_celltowers'
    )
    const se_celltowers_status = se_celltowers?.status
    const se_celltowers_value = se_celltowers?.value

    const se_nightlight_intensity = se_socio_economic?.data.find(
      (e) => e.slug === 'se_nightlight_intensity'
    )
    const se_nightlight_intensity_status = se_nightlight_intensity?.status
    const se_nightlight_intensity_value = se_nightlight_intensity?.value

    const se_relative_wealth = se_socio_economic?.data.find(
      (e) => e.slug === 'se_relative_wealth'
    )
    const se_relative_wealth_status = se_relative_wealth?.status
    const se_relative_wealth_value = se_relative_wealth?.value

    const se_GDP = se_socio_economic?.data.find((e) => e.slug === 'se_GDP')
    const se_GDP_status = se_GDP?.status
    const se_GDP_value = se_GDP?.value

    const se_bio_physical = state.socioeconomic.data.find(
      (x) => x.slug === 'se_bio_physical'
    )

    const se_plant_health = se_bio_physical?.data.find(
      (x) => x.slug === 'se_plant_health'
    )
    const se_plant_health_status = se_plant_health?.status
    const se_plant_health_value = se_plant_health?.value

    const se_temperature_max = se_bio_physical?.data.find(
      (x) => x.slug === 'se_temperature_max'
    )
    const se_temperature_max_status = se_temperature_max?.status
    const se_temperature_max_value = se_temperature_max?.value

    const se_elevation = se_bio_physical?.data.find(
      (e) => e.slug === 'se_elevation'
    )
    const se_elevation_status = se_elevation?.status
    const se_elevation_value = se_elevation?.value

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
      se_socio_economic,
      se_population_counts,
      se_population_counts_status,
      se_population_counts_value,
      se_celltowers,
      se_celltowers_status,
      se_celltowers_value,
      se_nightlight_intensity,
      se_nightlight_intensity_status,
      se_nightlight_intensity_value,
      se_relative_wealth,
      se_relative_wealth_status,
      se_relative_wealth_value,
      se_GDP,
      se_GDP_status,
      se_GDP_value,
      se_plant_health,
      se_plant_health_status,
      se_plant_health_value,
      se_temperature_max,
      se_temperature_max_status,
      se_temperature_max_value,
      se_elevation,
      se_elevation_status,
      se_elevation_value,
    }
  }

  return { newProjection, seLayersData }
}
