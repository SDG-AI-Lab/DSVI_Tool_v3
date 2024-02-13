import se_random_forest_1 from './rf_1.json'
import se_random_forest_2 from './rf_2.json'
import se_random_forest_3 from './rf_3.json'
import se_xgboost_1 from './XGBoost_1.json'
import se_xgboost_2 from './XGBoost_2.json'
import se_xgboost_3 from './XGBoost_3.json'
import se_edu_1 from './edu_1.json'
import se_edu_2 from './edu_2.json'
import se_edu_3 from './edu_3.json'
import se_health_1 from './health_1.json'
import se_health_2 from './health_2.json'
import se_health_3 from './health_3.json'
import se_finance_1 from './finan_1.json'
import se_finance_2 from './finan_2.json'
import se_finance_3 from './finan_3.json'
import se_population_1 from './ppp_pop_1.json'
import se_population_2 from './ppp_pop_2.json'
import se_population_3 from './ppp_pop_3.json'
import se_celltowers_1 from './cellt_1.json'
import se_celltowers_2 from './cellt_2.json'
import se_celltowers_3 from './cellt_3.json'
import se_nightlight_intensity_1 from './ntl_vnl_npp_2016_1.json'
import se_nightlight_intensity_2 from './ntl_vnl_npp_2016_2.json'
import se_nightlight_intensity_3 from './ntl_vnl_npp_2016_3.json'
import se_relative_wealth_1 from './rwi_1.json'
import se_relative_wealth_2 from './rwi_2.json'
import se_relative_wealth_3 from './rwi_3.json'
import se_GDP_1 from './gdp_2015_1.json'
import se_GDP_2 from './gdp_2015_2.json'
import se_GDP_3 from './gdp_2015_3.json'
import se_plant_health_1 from './ndvi_1.json'
import se_plant_health_2 from './ndvi_2.json'
import se_plant_health_3 from './ndvi_3.json'
import se_temperature_max_1 from './temp_1.json'
import se_temperature_max_2 from './temp_2.json'
import se_temperature_max_3 from './temp_3.json'
import se_land_use_class_1 from './lu_1.json'
import se_land_use_class_2 from './lu_2.json'
import se_land_use_class_3 from './lu_3.json'
import se_elevation_1 from './dem_1.json'
import se_elevation_2 from './dem_2.json'
import se_elevation_3 from './dem_3.json'

export interface GeoJson {
  [key: string]: {
    type: string
    name: string
    crs: {
      type: string
    }
  }
}

export const geojson: GeoJson = {
  se_random_forest_1,
  se_random_forest_2,
  se_random_forest_3,
  se_xgboost_1,
  se_xgboost_2,
  se_xgboost_3,
  se_edu_1,
  se_edu_2,
  se_edu_3,
  se_health_1,
  se_health_2,
  se_health_3,
  se_finance_1,
  se_finance_2,
  se_finance_3,
  se_population_1,
  se_population_2,
  se_population_3,
  se_celltowers_1,
  se_celltowers_2,
  se_celltowers_3,
  se_nightlight_intensity_1,
  se_nightlight_intensity_2,
  se_nightlight_intensity_3,
  se_relative_wealth_1,
  se_relative_wealth_2,
  se_relative_wealth_3,
  se_GDP_1,
  se_GDP_2,
  se_GDP_3,
  se_plant_health_1,
  se_plant_health_2,
  se_plant_health_3,
  se_temperature_max_1,
  se_temperature_max_2,
  se_temperature_max_3,
  se_land_use_class_1,
  se_land_use_class_2,
  se_land_use_class_3,
  se_elevation_1,
  se_elevation_2,
  se_elevation_3,
}
