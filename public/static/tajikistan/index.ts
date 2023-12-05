import se_random_forest_1 from 'public/static/tajikistan/rf_1.geojson'
import se_random_forest_2 from 'public/static/tajikistan/rf_2.geojson'
import se_random_forest_3 from 'public/static/tajikistan/rf_3.geojson'
import se_xgboost_1 from 'public/static/tajikistan/XGBoost_1.geojson'
import se_xgboost_2 from 'public/static/tajikistan/XGBoost_2.geojson'
import se_xgboost_3 from 'public/static/tajikistan/XGBoost_3.geojson'
import se_edu_1 from 'public/static/tajikistan/edu_1.geojson'
import se_edu_2 from 'public/static/tajikistan/edu_2.geojson'
import se_edu_3 from 'public/static/tajikistan/edu_3.geojson'
import se_health_1 from 'public/static/tajikistan/health_1.geojson'
import se_health_2 from 'public/static/tajikistan/health_2.geojson'
import se_health_3 from 'public/static/tajikistan/health_3.geojson'
import se_finance_1 from 'public/static/tajikistan/finan_1.geojson'
import se_finance_2 from 'public/static/tajikistan/finan_2.geojson'
import se_finance_3 from 'public/static/tajikistan/finan_3.geojson'
import se_population_1 from 'public/static/tajikistan/ppp_pop_1.geojson'
import se_population_2 from 'public/static/tajikistan/ppp_pop_2.geojson'
import se_population_3 from 'public/static/tajikistan/ppp_pop_3.geojson'
import se_celltowers_1 from 'public/static/tajikistan/cellt_1.geojson'
import se_celltowers_2 from 'public/static/tajikistan/cellt_2.geojson'
import se_celltowers_3 from 'public/static/tajikistan/cellt_3.geojson'
import se_nightlight_intensity_1 from 'public/static/tajikistan/ntl_vnl_npp_2016_1.geojson'
import se_nightlight_intensity_2 from 'public/static/tajikistan/ntl_vnl_npp_2016_2.geojson'
import se_nightlight_intensity_3 from 'public/static/tajikistan/ntl_vnl_npp_2016_3.geojson'
import se_relative_wealth_1 from 'public/static/tajikistan/rwi_1.geojson'
import se_relative_wealth_2 from 'public/static/tajikistan/rwi_2.geojson'
import se_relative_wealth_3 from 'public/static/tajikistan/rwi_3.geojson'
import se_GDP_1 from 'public/static/tajikistan/gdp_2015_1.geojson'
import se_GDP_2 from 'public/static/tajikistan/gdp_2015_2.geojson'
import se_GDP_3 from 'public/static/tajikistan/gdp_2015_3.geojson'
import se_plant_health_1 from 'public/static/tajikistan/ndvi_1.geojson'
import se_plant_health_2 from 'public/static/tajikistan/ndvi_2.geojson'
import se_plant_health_3 from 'public/static/tajikistan/ndvi_3.geojson'
import se_temperature_max_1 from 'public/static/tajikistan/temp_1.geojson'
import se_temperature_max_2 from 'public/static/tajikistan/temp_2.geojson'
import se_temperature_max_3 from 'public/static/tajikistan/temp_3.geojson'
import se_land_use_class_1 from 'public/static/tajikistan/lu_1.geojson'
import se_land_use_class_2 from 'public/static/tajikistan/lu_2.geojson'
import se_land_use_class_3 from 'public/static/tajikistan/lu_3.geojson'
import se_elevation_1 from 'public/static/tajikistan/dem_1.geojson'
import se_elevation_2 from 'public/static/tajikistan/dem_2.geojson'
import se_elevation_3 from 'public/static/tajikistan/dem_3.geojson'

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
