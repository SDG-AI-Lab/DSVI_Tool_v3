import React from 'react'
import CustomPolygon from '../controls/CustomPolygon'
import CustomPolygon_AOI from '../controls/CustomPolygon_AOI'

import L from 'leaflet'
import { DataReducerInitialStateType } from '../../reducer/reducer'

import { geojson } from '/public/static'

export type SeLayerObjectType = {
  id: number
  json_library: string
  reverse_meaning: boolean
  slug: string
  status: boolean
  title: string
  units: string
  value: number
}

interface CombinedLayerData {
  layerInfo: SeLayerObjectType | undefined
  geojson: { crs: any; features: any; name: string; type: string }[]
}

interface Library {
  geometry: {
    coordinates: any[]
    type: string
  }
  properties: any
  type: string
}

export const useMapFunctions = () => {
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

  const newProjection = (
    full_JSON_library,
    library,
    index: number,
    layerObject: SeLayerObjectType,
    show_data: boolean
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

  const AOI_projection = (library: Library, index: number) => {
    const fillColorAOI = 'rgb(255, 255, 255)'
    const hoverColor = 'blue'

    return (
      <CustomPolygon_AOI
        key={index}
        positions={L.GeoJSON.coordsToLatLngs(
          library.geometry.coordinates[0][0]
        )}
        fillColor={fillColorAOI}
        hoverColor={hoverColor}
        opacity="0.7"
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

    const se_education_facility = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_education_facility')

    const se_health_institution = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_health_institution')

    const se_financial_service = state.socioeconomic.data
      .find((x) => x.slug === 'se_drive_time')
      ?.data.find((x) => x.slug === 'se_financial_service')

    const se_socio_economic = state.socioeconomic.data.find(
      (x) => x.slug === 'se_socio_economic'
    )
    const se_population_counts = se_socio_economic?.data.find(
      (e) => e.slug === 'se_population_counts'
    )

    const se_celltowers = se_socio_economic?.data.find(
      (e) => e.slug === 'se_celltowers'
    )

    const se_nightlight_intensity = se_socio_economic?.data.find(
      (e) => e.slug === 'se_nightlight_intensity'
    )

    const se_relative_wealth = se_socio_economic?.data.find(
      (e) => e.slug === 'se_relative_wealth'
    )

    const se_GDP = se_socio_economic?.data.find((e) => e.slug === 'se_GDP')

    const se_bio_physical = state.socioeconomic.data.find(
      (x) => x.slug === 'se_bio_physical'
    )

    const se_plant_health = se_bio_physical?.data.find(
      (x) => x.slug === 'se_plant_health'
    )

    const se_temperature_max = se_bio_physical?.data.find(
      (x) => x.slug === 'se_temperature_max'
    )

    const se_elevation = se_bio_physical?.data.find(
      (e) => e.slug === 'se_elevation'
    )

    const combinedLayerData: CombinedLayerData[] = [
      {
        layerInfo: se_random_forest,
        geojson: [
          geojson.se_random_forest_1,
          geojson.se_random_forest_2,
          geojson.se_random_forest_3,
        ],
      },
      {
        layerInfo: se_education_facility,
        geojson: [geojson.se_edu_1, geojson.se_edu_2, geojson.se_edu_3],
      },

      {
        layerInfo: se_health_institution,
        geojson: [
          geojson.se_health_1,
          geojson.se_health_2,
          geojson.se_health_3,
        ],
      },
      {
        layerInfo: se_financial_service,
        geojson: [
          geojson.se_finance_1,
          geojson.se_finance_2,
          geojson.se_finance_3,
        ],
      },
      {
        layerInfo: se_population_counts,
        geojson: [
          geojson.se_population_1,
          geojson.se_population_2,
          geojson.se_population_3,
        ],
      },
      {
        layerInfo: se_celltowers,
        geojson: [
          geojson.se_celltowers_1,
          geojson.se_celltowers_2,
          geojson.se_celltowers_3,
        ],
      },
      {
        layerInfo: se_nightlight_intensity,
        geojson: [
          geojson.se_nightlight_intensity_1,
          geojson.se_nightlight_intensity_2,
          geojson.se_nightlight_intensity_3,
        ],
      },
      {
        layerInfo: se_relative_wealth,
        geojson: [
          geojson.se_relative_wealth_1,
          geojson.se_relative_wealth_2,
          geojson.se_relative_wealth_3,
        ],
      },
      {
        layerInfo: se_GDP,
        geojson: [geojson.se_GDP_1, geojson.se_GDP_2, geojson.se_GDP_3],
      },
      {
        layerInfo: se_plant_health,
        geojson: [
          geojson.se_plant_health_1,
          geojson.se_plant_health_2,
          geojson.se_plant_health_3,
        ],
      },
      {
        layerInfo: se_temperature_max,
        geojson: [
          geojson.se_temperature_max_1,
          geojson.se_temperature_max_2,
          geojson.se_temperature_max_3,
        ],
      },
      {
        layerInfo: se_elevation,
        geojson: [
          geojson.se_elevation_1,
          geojson.se_elevation_2,
          geojson.se_elevation_3,
        ],
      },
    ]

    return combinedLayerData
  }

  const svLayersData = (state: DataReducerInitialStateType) => {
    const geodata = state['geodata']['data']
    const social_vulnerability = geodata.find(
      (e) => e.slug === 'sv_social_vulnerability'
    )

    // const sv_linear_model = social_vulnerability.data.find((e) => e.slug === 'sv_linear_model');
    // const {status: sv_linear_model_status, value: sv_linear_model_value} = sv_linear_model;

    const sv_xgboost = social_vulnerability?.data.find(
      (e) => e.slug === 'sv_xgboost'
    )

    const sv_random_forest = social_vulnerability?.data.find(
      (e) => e.slug === 'sv_random_forest'
    )

    const distance_maps = geodata.find((e) => e.slug === 'sv_distance_maps')
    const distance_to_healthcare = distance_maps?.data.find(
      (e) => e.slug === 'sv_distance_to_healthcare'
    )

    const distance_to_finance = distance_maps?.data.find(
      (e) => e.slug === 'sv_distance_to_finance'
    )

    const distance_to_edu = distance_maps?.data.find(
      (e) => e.slug === 'sv_distance_to_edu'
    )

    const roads = distance_maps?.data.find((e) => e.slug === 'sv_roads')

    const bio_physical = geodata.find((e) => e.slug === 'sv_bio_physical')
    const elevation = bio_physical?.data.find((e) => e.slug === 'sv_elevation')

    const slope = bio_physical?.data.find((e) => e.slug === 'sv_slope')

    const max_temp = bio_physical?.data.find((e) => e.slug === 'sv_max_temp')

    const plant_health = bio_physical?.data.find(
      (e) => e.slug === 'sv_plant_health'
    )

    const precipitation = bio_physical?.data.find(
      (e) => e.slug === 'sv_precipitation'
    )

    const socio_economic = geodata.find((e) => e.slug === 'sv_socio_economic')
    const nightlight_intensity = socio_economic?.data.find(
      (e) => e.slug === 'sv_nightlight_intensity'
    )

    const pop_density = socio_economic?.data.find(
      (e) => e.slug === 'sv_pop_density'
    )

    const celltower = socio_economic?.data.find(
      (e) => e.slug === 'sv_celltower'
    )

    // const road_density = socio_economic.data.find((e) => e.slug === 'sv_road_density');
    // const {status: road_density_status, value: road_density_value} = road_density;

    const relative_wealth = socio_economic?.data.find(
      (e) => e.slug === 'sv_relative_wealth'
    )

    const gdp = socio_economic?.data.find((e) => e.slug === 'sv_gdp')

    return [
      sv_xgboost,
      sv_random_forest,
      distance_maps,
      distance_to_healthcare,
      distance_to_finance,
      distance_to_edu,
      roads,
      bio_physical,
      elevation,
      slope,
      max_temp,
      plant_health,
      precipitation,
      socio_economic,
      nightlight_intensity,
      pop_density,
      celltower,
      relative_wealth,
      gdp,
    ]
  }

  const categoriesData = (state: DataReducerInitialStateType) => {
    const { vulnerability, categories } = state

    const cats_very_low = categories.find((e) => e.slug === 'cats_very_low')
    const cats_very_low_status = cats_very_low?.status

    const cats_low = categories.find((e) => e.slug === 'cats_low')
    const cats_low_status = cats_low?.status

    const cats_medium = categories.find((e) => e.slug === 'cats_medium')
    const cats_medium_status = cats_medium?.status

    const cats_high = categories.find((e) => e.slug === 'cats_high')
    const cats_high_status = cats_high?.status

    const cats_very_high = categories.find((e) => e.slug === 'cats_very_high')
    const cats_very_high_status = cats_very_high?.status

    return [
      // cats_very_low,
      cats_very_low_status,
      // cats_low,
      cats_low_status,
      // cats_medium,
      cats_medium_status,
      // cats_high,
      cats_high_status,
      // cats_very_high,
      cats_very_high_status,
    ]
  }

  return {
    newProjection,
    seLayersData,
    svLayersData,
    categoriesData,
    AOI_projection,
  }
}
