import {
  ReducerInitialStateType,
  SvLayerObjectType,
} from '../../reducer/reducerInitialState'
import { SeLayerObjectType } from '../../reducer/reducerInitialState'

import { geojson as geojsonTajikistan } from '../../public/static/tajikistan'
import { geojson as geojsonNiger } from '../../public/static/niger'

type CombinedLayerData = {
  layerInfo: SeLayerObjectType | undefined
  geojson: SingleGeoJson[]
}

export const useMapFunctions = () => {
  const seLayersData = (state: ReducerInitialStateType) => {
    const { country } = state
    let geojson = country === 'tajikistan' ? geojsonTajikistan : geojsonNiger

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
      (x) => x.slug === 'se_population_counts'
    )

    const se_celltowers = se_socio_economic?.data.find(
      (x) => x.slug === 'se_celltowers'
    )

    const se_nightlight_intensity = se_socio_economic?.data.find(
      (x) => x.slug === 'se_nightlight_intensity'
    )

    const se_relative_wealth = se_socio_economic?.data.find(
      (x) => x.slug === 'se_relative_wealth'
    )

    const se_GDP = se_socio_economic?.data.find((x) => x.slug === 'se_GDP')

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
      (x) => x.slug === 'se_elevation'
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

  const svLayersData = (
    state: ReducerInitialStateType
  ): SvLayerObjectType[] => {
    const geodata = state['geodata']['data']
    const social_vulnerability = geodata.find(
      (x) => x.slug === 'sv_social_vulnerability'
    )

    // const sv_linear_model = social_vulnerability.data.find((e) => e.slug === 'sv_linear_model');
    // const {status: sv_linear_model_status, value: sv_linear_model_value} = sv_linear_model;

    const sv_xgboost = social_vulnerability?.data.find(
      (x) => x.slug === 'sv_xgboost'
    )

    const sv_random_forest = social_vulnerability?.data.find(
      (x) => x.slug === 'sv_random_forest'
    )

    const distance_maps = geodata.find((e) => e.slug === 'sv_distance_maps')
    const distance_to_healthcare = distance_maps?.data.find(
      (x) => x.slug === 'sv_distance_to_healthcare'
    )

    const distance_to_finance = distance_maps?.data.find(
      (x) => x.slug === 'sv_distance_to_finance'
    )

    const distance_to_edu = distance_maps?.data.find(
      (x) => x.slug === 'sv_distance_to_edu'
    )

    const roads = distance_maps?.data.find((x) => x.slug === 'sv_roads')

    const bio_physical = geodata.find((x) => x.slug === 'sv_bio_physical')
    const elevation = bio_physical?.data.find((e) => e.slug === 'sv_elevation')

    const slope = bio_physical?.data.find((x) => x.slug === 'sv_slope')

    const max_temp = bio_physical?.data.find((x) => x.slug === 'sv_max_temp')

    const plant_health = bio_physical?.data.find(
      (x) => x.slug === 'sv_plant_health'
    )

    const precipitation = bio_physical?.data.find(
      (x) => x.slug === 'sv_precipitation'
    )

    const socio_economic = geodata.find((x) => x.slug === 'sv_socio_economic')
    const nightlight_intensity = socio_economic?.data.find(
      (x) => x.slug === 'sv_nightlight_intensity'
    )

    const pop_density = socio_economic?.data.find(
      (x) => x.slug === 'sv_pop_density'
    )

    const celltower = socio_economic?.data.find(
      (x) => x.slug === 'sv_celltower'
    )

    // const road_density = socio_economic.data.find((e) => e.slug === 'sv_road_density');
    // const {status: road_density_status, value: road_density_value} = road_density;

    const relative_wealth = socio_economic?.data.find(
      (x) => x.slug === 'sv_relative_wealth'
    )

    const gdp = socio_economic?.data.find((x) => x.slug === 'sv_gdp')

    return [
      sv_xgboost,
      sv_random_forest,
      distance_to_healthcare,
      distance_to_finance,
      distance_to_edu,
      roads,
      elevation,
      slope,
      max_temp,
      plant_health,
      precipitation,
      nightlight_intensity,
      pop_density,
      celltower,
      relative_wealth,
      gdp,
    ]
  }

  const categoriesData = (state: ReducerInitialStateType) => {
    const { vulnerability, categories } = state

    const cats_very_low = categories.find((x) => x.slug === 'cats_very_low')
    const cats_very_low_status = cats_very_low?.status

    const cats_low = categories.find((x) => x.slug === 'cats_low')
    const cats_low_status = cats_low?.status

    const cats_medium = categories.find((x) => x.slug === 'cats_medium')
    const cats_medium_status = cats_medium?.status

    const cats_high = categories.find((x) => x.slug === 'cats_high')
    const cats_high_status = cats_high?.status

    const cats_very_high = categories.find((x) => x.slug === 'cats_very_high')
    const cats_very_high_status = cats_very_high?.status

    return [
      cats_very_low_status,
      cats_low_status,
      cats_medium_status,
      cats_high_status,
      cats_very_high_status,
    ]
  }

  return {
    seLayersData,
    svLayersData,
    categoriesData,
  }
}
