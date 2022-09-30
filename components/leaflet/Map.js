import React, { useContext } from 'react'
import L from 'leaflet'
import {MapContainer, LayersControl, WMSTileLayer, ZoomControl} from 'react-leaflet'
import Legend from '../controls/Legend';
import styles from './Map.module.scss'
import {FilterContext} from '../../context/FilterContext'
import {LegendContext} from '../../context/LegendContext'
import {Settings, TileProviders} from '../../config/MapConfiguration';
import ControlMenu from '../controls/ControlMenu';
import CustomPolygon from '../controls/CustomPolygon';
import CircleMarkers from '../marker/CircleMarkers';
import CircleMarkersVulnerability from '../marker/CircleMarkersVulnerability';
import MapToolbar from '../controls/MapToolbar';

import AOI from '/public/static/AOI.geojson'

import se_random_forest_1 from '/public/static/rf_1.geojson'
import se_random_forest_2 from '/public/static/rf_2.geojson'
import se_random_forest_3 from '/public/static/rf_3.geojson'
import se_xgboost_1 from '/public/static/XGBoost_1.geojson'
import se_xgboost_2 from '/public/static/XGBoost_2.geojson'
import se_xgboost_3 from '/public/static/XGBoost_3.geojson'
import se_edu_1 from '/public/static/edu_1.geojson'
import se_edu_2 from '/public/static/edu_2.geojson'
import se_edu_3 from '/public/static/edu_3.geojson'
import se_health_1 from '/public/static/health_1.geojson'
import se_health_2 from '/public/static/health_2.geojson'
import se_health_3 from '/public/static/health_3.geojson'
import se_finance_1 from '/public/static/finan_1.geojson'
import se_finance_2 from '/public/static/finan_2.geojson'
import se_finance_3 from '/public/static/finan_3.geojson'
import se_population_1 from '/public/static/ppp_pop_1.geojson'
import se_population_2 from '/public/static/ppp_pop_2.geojson'
import se_population_3 from '/public/static/ppp_pop_3.geojson'
import se_celltowers_1 from '/public/static/cellt_1.geojson'
import se_celltowers_2 from '/public/static/cellt_2.geojson'
import se_celltowers_3 from '/public/static/cellt_3.geojson'
import se_nightlight_intensity_1 from '/public/static/ntl_vnl_npp_2016_1.geojson'
import se_nightlight_intensity_2 from '/public/static/ntl_vnl_npp_2016_2.geojson'
import se_nightlight_intensity_3 from '/public/static/ntl_vnl_npp_2016_3.geojson'
import se_relative_wealth_1 from '/public/static/rwi_1.geojson'
import se_relative_wealth_2 from '/public/static/rwi_2.geojson'
import se_relative_wealth_3 from '/public/static/rwi_3.geojson'
import se_GDP_1 from '/public/static/gdp_2015_1.geojson'
import se_GDP_2 from '/public/static/gdp_2015_2.geojson'
import se_GDP_3 from '/public/static/gdp_2015_3.geojson'
import se_plant_health_1 from '/public/static/ndvi_1.geojson'
import se_plant_health_2 from '/public/static/ndvi_2.geojson'
import se_plant_health_3 from '/public/static/ndvi_3.geojson'
import se_temperature_max_1 from '/public/static/temp_1.geojson'
import se_temperature_max_2 from '/public/static/temp_2.geojson'
import se_temperature_max_3 from '/public/static/temp_3.geojson'
import se_land_use_class_1 from '/public/static/lu_1.geojson'
import se_land_use_class_2 from '/public/static/lu_2.geojson'
import se_land_use_class_3 from '/public/static/lu_3.geojson'
import se_elevation_1 from '/public/static/dem_1.geojson'
import se_elevation_2 from '/public/static/dem_2.geojson'
import se_elevation_3 from '/public/static/dem_3.geojson'

import BetterWMSTileLayer from '../controls/BetterWMSTileLayer';

const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)
  const { state: legenddata, dispatch: setLegendData } = useContext(LegendContext);
  const level = state["level"];
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
  const show_infoBox_data = state['show_infoBox_data'];
  const show_area_of_interest = state['show_area_of_interest'];
  const socioeconomic = state['socioeconomic']['data'];
  const geodata = state['geodata']['data'];

  const NormalizeData = (number, maxNumber, minNumber) => {
    const val = Math.abs((number - minNumber) / (maxNumber - minNumber));
    return mapPolygonColorToDensity(val);
  };

// Mouse HOVER color is WHITE

  const mapPolygonColorToDensity = (normalizeData => {
    switch (true) {
      case normalizeData > 0.9: return '#0c58ca'; // BLUE
      case normalizeData > 0.7:  return '#00800A'; // GREEN
      case normalizeData > 0.55: return '#FFDE2C'; // YELLOW
      case normalizeData > 0.25:  return '#ff962c'; // ORANGE
      case normalizeData > 0: return '#FF362C'; // RED
      default: return '#FFFFFF'; // WHITE
    }
  })

  /* Socioeconomic. START */
  const se_social_vulnerability = socioeconomic.find((e) => e.slug === 'se_social_vulnerability');
  const se_random_forest = se_social_vulnerability.data.find((e) => e.slug === 'se_random_forest');
  const {status: se_random_forest_status, value: se_random_forest_value} = se_random_forest;
  const se_xgboost = se_social_vulnerability.data.find((e) => e.slug === 'se_xgboost');
  const {status: se_xgboost_status, value: se_xgboost_value} = se_xgboost;

  const se_drive_time = socioeconomic.find((e) => e.slug === 'se_drive_time');
  const se_education_facility = se_drive_time.data.find((e) => e.slug === 'se_education_facility');
  const {status: se_education_facility_status, value: se_education_facility_value} = se_education_facility;
  const se_health_institution = se_drive_time.data.find((e) => e.slug === 'se_health_institution');
  const {status: se_health_institution_status, value: dt_health_institution_value} = se_health_institution;
  const se_financial_service = se_drive_time.data.find((e) => e.slug === 'se_financial_service');
  const {status: se_financial_service_status, value: se_financial_service_value} = se_financial_service;

  const se_socio_economic = socioeconomic.find((e) => e.slug === 'se_socio_economic');
  const se_population_counts = se_socio_economic.data.find((e) => e.slug === 'se_population_counts');
  const {status: se_population_counts_status, value: population_counts_value} = se_population_counts;
  const se_celltowers = se_socio_economic.data.find((e) => e.slug === 'se_celltowers');
  const {status: se_celltowers_status, value: se_celltowers_value} = se_celltowers;
  const se_nightlight_intensity = se_socio_economic.data.find((e) => e.slug === 'se_nightlight_intensity');
  const {status: se_nightlight_intensity_status, value: se_nightlight_intensity_value} = se_nightlight_intensity;
  const se_relative_wealth = se_socio_economic.data.find((e) => e.slug === 'se_relative_wealth');
  const {status: se_relative_wealth_status, value: se_relative_wealth_value} = se_relative_wealth;
  const se_GDP = se_socio_economic.data.find((e) => e.slug === 'se_GDP');
  const {status: se_GDP_status, value: se_GDP_value} = se_GDP;

  const se_bio_physical = socioeconomic.find((e) => e.slug === 'se_bio_physical');
  const se_plant_health = se_bio_physical.data.find((e) => e.slug === 'se_plant_health');
  const {status: se_plant_health_status, value: se_plant_health_value} = se_plant_health;
  const se_temperature_max = se_bio_physical.data.find((e) => e.slug === 'se_temperature_max');
  const {status: se_temperature_max_status, value: se_temperature_max_value} = se_temperature_max;
  const se_land_use_class = se_bio_physical.data.find((e) => e.slug === 'se_land_use_class');
  const {status: se_land_use_class_status, value: se_land_use_class_value} = se_land_use_class;
  const se_elevation = se_bio_physical.data.find((e) => e.slug === 'se_elevation');
  const {status: se_elevation_status, value: se_elevation_value} = se_elevation;
  /* Socioeconomic. END */

  /* Geodata Layers. START */
  const social_vulnerability = geodata.find((e) => e.slug === 'social_vulnerability');

  const sv_linear_model = social_vulnerability.data.find((e) => e.slug === 'sv_linear_model');
  const {status: sv_linear_model_status, value: sv_linear_model_value} = sv_linear_model;

  const sv_xgboost = social_vulnerability.data.find((e) => e.slug === 'sv_xgboost');
  const {status: sv_xgboost_status, value: sv_xgboost_value} = sv_xgboost;

  const sv_random_forest = social_vulnerability.data.find((e) => e.slug === 'sv_random_forest');
  const {status: sv_random_forest_status, value: sv_random_forest_value} = sv_random_forest;

  const distance_maps = geodata.find((e) => e.slug === 'distance_maps');
  const distance_to_healthcare = distance_maps.data.find((e) => e.slug === 'distance_to_healthcare');
  const {status: distance_to_healthcare_status, value: distance_to_healthcare_value} = distance_to_healthcare;
  const distance_to_finance = distance_maps.data.find((e) => e.slug === 'distance_to_finance');
  const {status: distance_to_finance_status, value: distance_to_finance_value} = distance_to_finance;
  const distance_to_edu = distance_maps.data.find((e) => e.slug === 'distance_to_edu');
  const {status: distance_to_edu_status, value: distance_to_edu_value} = distance_to_edu;

  const bio_physical = geodata.find((e) => e.slug === 'bio_physical');
  const elevation = bio_physical.data.find((e) => e.slug === 'elevation');
  const {status: elevation_status, value: elevation_value} = elevation;
  const slope = bio_physical.data.find((e) => e.slug === 'slope');
  const {status: slope_status, value: slope_value} = slope;
  const max_temp = bio_physical.data.find((e) => e.slug === 'max_temp');
  const {status: max_temp_status, value: max_temp_value} = max_temp;
  const plant_health = bio_physical.data.find((e) => e.slug === 'plant_health');
  const {status: plant_health_status, value: plant_health_value} = plant_health;
  const precipitation = bio_physical.data.find((e) => e.slug === 'precipitation');
  const {status: precipitation_status, value: precipitation_value} = precipitation;

  const socio_economic = geodata.find((e) => e.slug === 'socio_economic');
  const nightlight_intensity = socio_economic.data.find((e) => e.slug === 'nightlight_intensity');
  const {status: nightlight_intensity_status, value: nightlight_intensity_value} = nightlight_intensity;
  const pop_density = socio_economic.data.find((e) => e.slug === 'pop_density');
  const {status: pop_density_status, value: pop_density_value} = pop_density;
  const celltower = socio_economic.data.find((e) => e.slug === 'celltower');
  const {status: celltower_status, value: celltower_value} = celltower;
  const road_density = socio_economic.data.find((e) => e.slug === 'road_density');
  const {status: road_density_status, value: road_density_value} = road_density;
  const relative_wealth = socio_economic.data.find((e) => e.slug === 'relative_wealth');
  const {status: relative_wealth_status, value: relative_wealth_value} = relative_wealth;
  const gdp = socio_economic.data.find((e) => e.slug === 'gdp');
  const {status: gdp_status, value: gdp_value} = gdp;



  /* Geodata Layers. END */
  const newProjection = (library, index, layer_opacity) => {
    const {NAME, NAME_1, NAME_2, _mean, _count, _stdev, _max, _min } = library.properties;
    const {} = library.name;
    const data = [

      // These are shown when the user clicks on the polygon
      {
        "key": "Oblast",
        "value": NAME_1
      },
      {
        "key": "District",
        "value": NAME_2
      },
      {
        "key": "Count",
        "value": _count
      },
      {
        "key": "Mean value",
        "value": _mean
      }
    ];
    const fillColor = NormalizeData(_mean, _max, _min);
    return (
        <CustomPolygon
            key={index}
            positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
            fillColor={fillColor}
            opacity={layer_opacity/100}
            tooltipDirection="auto"
            tooltipOffset={[20, 0]}
            tooltipCount={library.properties._mean} // library.properties._count
            tooltipName_1={library.properties.NAME_1}
            tooltipName_2={library.properties.NAME_2}
            tooltipName_3={library.properties.NAME_2}
            tooltipBgcolor="rgb(255 255 255)"
            tooltipTextColor="text-slate-700"
            show_data={show_data}
            popupMaxWidth="auto"
            popupMaxHeight="auto"
            popupBgColor="bg-white"
            popupTextColor="text-slate-700"
            data={data}
        />
    )
  };

  return (
      <MapContainer
        center={Settings.latlong}
        zoom={Settings.zoom}
        zoomControl={false}
        scrollWheelZone={true}
        className={styles.container}
      >
        <LayersControl position="topright">
          {TileProviders.map(({ name, checked, args }) => (
            <LayersControl.BaseLayer {...{ name, checked }} key={name}>
              <WMSTileLayer {...{ ...args }} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        <ZoomControl
          position="bottomright"
        />
        <ControlMenu position="topRight" show_data={show_data} show_infoBox_data={show_infoBox_data}
          children={
            distance_to_healthcare_status ?
              <Legend />
              :
              null
          }
        >
        </ControlMenu>

        {/* Show Area of Interest. START */}
        {show_area_of_interest && AOI.features.map((library, index) => {
          return newProjection(library, index, 70)
        })}
        {/* Show Area of Interest. END */}

        {/* NEW. Socioeconomic. START */}
        {/*Random Forest*/}
        {se_random_forest_status && level === 1 && se_random_forest_1.features.map((library, index) => {
          return newProjection(library, index, se_random_forest_value)
        })}
        {/*Random Forest*/}
        {se_random_forest_status && level === 2 && se_random_forest_2.features.map((library, index) => {
          return newProjection(library, index, se_random_forest_value)
        })}
        {/*Random Forest*/}
        {se_random_forest_status && level === 3 && se_random_forest_3.features.map((library, index) => {
          return newProjection(library, index, se_random_forest_value)
        })}
        {/*XG Boost*/}
        {se_xgboost_status && level === 1 && se_xgboost_1.features.map((library, index) => {
        return newProjection(library, index, se_xgboost_value)
        })}
        {/*XG Boost*/}
        {se_xgboost_status && level === 2 && se_xgboost_2.features.map((library, index) => {
          return newProjection(library, index, se_xgboost_value)
        })}
        {/*XG Boost*/}
        {se_xgboost_status && level === 3 && se_xgboost_3.features.map((library, index) => {
          return newProjection(library, index, se_xgboost_value)
        })}

        {/*Education Facilities*/}
        {se_education_facility_status && level === 1 && se_edu_1.features.map((library, index) => {
          return newProjection(library, index, se_education_facility_value)
        })}
        {se_education_facility_status && level === 2 && se_edu_2.features.map((library, index) => {
          return newProjection(library, index, se_education_facility_value)
        })}
        {se_education_facility_status && level === 3 && se_edu_3.features.map((library, index) => {
          return newProjection(library, index, se_education_facility_value)
        })}

        {/*Health Institutions*/}
        {se_health_institution_status && level === 1 && se_health_1.features.map((library, index) => {
          return newProjection(library, index, dt_health_institution_value)
        })}
        {se_health_institution_status && level === 2 && se_health_2.features.map((library, index) => {
          return newProjection(library, index, dt_health_institution_value)
        })}
        {se_health_institution_status && level === 3 && se_health_3.features.map((library, index) => {
          return newProjection(library, index, dt_health_institution_value)
        })}

        {/*Financial Services*/}
        {se_financial_service_status && level === 1 && se_finance_1.features.map((library, index) => {
          return newProjection(library, index, se_financial_service_value)
        })}
        {se_financial_service_status && level === 2 && se_finance_2.features.map((library, index) => {
          return newProjection(library, index, se_financial_service_value)
        })}
        {se_financial_service_status && level === 3 && se_finance_3.features.map((library, index) => {
          return newProjection(library, index, se_financial_service_value)
        })}

        {/*Population Counts*/}
        {se_population_counts_status && level === 1 && se_population_1.features.map((library, index) => {
          return newProjection(library, index, population_counts_value)
        })}
        {se_population_counts_status && level === 2 && se_population_2.features.map((library, index) => {
          return newProjection(library, index, population_counts_value)
        })}
        {se_population_counts_status && level === 3 && se_population_3.features.map((library, index) => {
          return newProjection(library, index, population_counts_value)
        })}

        {/*Cell Towers*/}
        {se_celltowers_status && level === 1 && se_celltowers_1.features.map((library, index) => {
          return newProjection(library, index, se_celltowers_value)
        })}
        {se_celltowers_status && level === 2 && se_celltowers_2.features.map((library, index) => {
          return newProjection(library, index, se_celltowers_value)
        })}
        {se_celltowers_status && level === 3 && se_celltowers_3.features.map((library, index) => {
          return newProjection(library, index, se_celltowers_value)
        })}

        {/*Nightlight Intensity*/}
        {se_nightlight_intensity_status && level === 1 && se_nightlight_intensity_1.features.map((library, index) => {
          return newProjection(library, index, se_nightlight_intensity_value)
        })}
        {se_nightlight_intensity_status && level === 2 && se_nightlight_intensity_2.features.map((library, index) => {
          return newProjection(library, index, se_nightlight_intensity_value)
        })}
        {se_nightlight_intensity_status && level === 3 && se_nightlight_intensity_3.features.map((library, index) => {
          return newProjection(library, index, se_nightlight_intensity_value)
        })}

        {/*Relative Wealth*/}
        {se_relative_wealth_status && level === 1 && se_relative_wealth_1.features.map((library, index) => {
          return newProjection(library, index, se_relative_wealth_value)
        })}
        {se_relative_wealth_status && level === 2 && se_relative_wealth_2.features.map((library, index) => {
          return newProjection(library, index, se_relative_wealth_value)
        })}
        {se_relative_wealth_status && level === 3 && se_relative_wealth_3.features.map((library, index) => {
          return newProjection(library, index, se_relative_wealth_value)
        })}

        {/*GDP*/}
        {se_GDP_status && level === 1 && se_GDP_1.features.map((library, index) => {
          return newProjection(library, index, se_GDP_value)
        })}
        {se_GDP_status && level === 2 && se_GDP_2.features.map((library, index) => {
          return newProjection(library, index, se_GDP_value)
        })}
        {se_GDP_status && level === 3 && se_GDP_3.features.map((library, index) => {
          return newProjection(library, index, se_GDP_value)
        })}

        {/*Plant Health*/}
        {se_plant_health_status && level === 1 && se_plant_health_1.features.map((library, index) => {
          return newProjection(library, index, se_plant_health_value)
        })}
        {se_plant_health_status && level === 2 && se_plant_health_2.features.map((library, index) => {
          return newProjection(library, index, se_plant_health_value)
        })}
        {se_plant_health_status && level === 3 && se_plant_health_3.features.map((library, index) => {
          return newProjection(library, index, se_plant_health_value)
        })}

        {/*Temperature Max*/}
        {se_temperature_max_status && level === 1 && se_temperature_max_1.features.map((library, index) => {
          return newProjection(library, index, se_temperature_max_value)
        })}
        {se_temperature_max_status && level === 2 && se_temperature_max_2.features.map((library, index) => {
          return newProjection(library, index, se_temperature_max_value)
        })}
        {se_temperature_max_status && level === 3 && se_temperature_max_3.features.map((library, index) => {
          return newProjection(library, index, se_temperature_max_value)
        })}

        {/*Land Use*/}
        {se_land_use_class_status && level === 1 && se_land_use_class_1.features.map((library, index) => {
          return newProjection(library, index, se_land_use_class_value)
        })}
        {se_land_use_class_status && level === 2 && se_land_use_class_2.features.map((library, index) => {
          return newProjection(library, index, se_land_use_class_value)
        })}
        {se_land_use_class_status && level === 3 && se_land_use_class_3.features.map((library, index) => {
          return newProjection(library, index, se_land_use_class_value)
        })}

        {/*Elevation*/}
        {se_elevation_status && level === 1 && se_elevation_1.features.map((library, index) => {
          return newProjection(library, index, se_elevation_value)
        })}
        {se_elevation_status && level === 2 && se_elevation_2.features.map((library, index) => {
          return newProjection(library, index, se_elevation_value)
        })}
        {se_elevation_status && level === 3 && se_elevation_3.features.map((library, index) => {
          return newProjection(library, index, se_elevation_value)
        })}
        {/* NEW. Socioeconomic. END */}

        {/* Geodata layer. START */}
        {sv_linear_model_status ?
            <WMSTileLayer
              params={{
                layers: "sdg-ai-lab:Linear_SV",
                format: "image/png",
                transparent: true,
                version: "1.1.0",
                style: "sdg-ai-lab:xgboost",
              }}
              url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
              zIndex="9999"
              opacity={sv_linear_model_value / 100}/>
          : null
          }

        {sv_xgboost_status ?
            <BetterWMSTileLayer
              url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
              layers="sdg-ai-lab:XGBoost_tuned_scaled_clipped_final"
              transparent= "true"
              zIndex="9999"
              styles="sdg-ai-lab:xgboost"
              opacity={sv_xgboost_value / 100}
            />
        : null
        }
        {/* OLD WMSTileLayer
          <WMSTileLayer
            params={{
              layers: "sdg-ai-lab:XGBoost_tuned_scaled_clipped_final",
              format: "image/png",
              transparent: true,
              version: "1.1.0",
              style: "sdg-ai-lab:xgboost",
            }}
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            zIndex="9999"
            opacity={sv_xgboost_value / 100}/> */}

        {sv_random_forest_status ?
          <BetterWMSTileLayer
              url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
              layers="sdg-ai-lab:Random_Forest_tuned_scaled_clp_final"
              transparent= "true"
              zIndex="9999"
              styles="sdg-ai-lab:xgboost"
              opacity={sv_random_forest_value / 100}
          />
        : null
        }

        {distance_to_healthcare_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_health_dd_spd_10k"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={distance_to_healthcare_value / 100}
            />
        : null
        }

        {distance_to_finance_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_finan_dd_spd_10k_4326"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={distance_to_finance_value / 100}
          />
        : null
        }

        {distance_to_edu_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_edu_dd_spd_10k_4326"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={distance_to_edu_value / 100}
          />
        : null
        }

        {elevation_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_DEM_Large"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={elevation_value / 100}
          />
        : null
        }

        {slope_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_slope"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={slope_value / 100}
          />
        : null
        }

        {max_temp_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_maxtemp_feb"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={max_temp_value / 100}
          />
        : null
        }

        {plant_health_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_NDVI"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={plant_health_value / 100}
          />
        : null
        }

        {precipitation_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_precip"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={precipitation_value / 100}
          />
        : null
        }

        {nightlight_intensity_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_NTL"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={nightlight_intensity_value / 100}
          />
        : null
        }

        {pop_density_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_pop"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={pop_density_value / 100}
          />
        : null
        }

        {celltower_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_cellt"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={celltower_value / 100}
          />
        : null
        }

        {road_density_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_road_density"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={road_density_value / 100}
          />
        : null
        }

        {relative_wealth_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_rwi_heatmap_filled_final"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={relative_wealth_value / 100}
          />
        : null
        }

        {gdp_status ?
          <BetterWMSTileLayer
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_GDP_2015_intp"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={gdp_value / 100}
          />
        : null
        }

        {/* {sv_linear_model ?
          <WMSTileLayer
            params={{
              layers: "sdg-ai-lab:Linear_SV",
              format: "image/png",
              transparent: true,
              version: "1.1.0",
              style: "sdg-ai-lab:xgboost",
            }}
            url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
            zIndex="9999"
            opacity={sv_linear_model / 100}/>
        : null
        } */}
        {/* Geodata layer. END */}

        <CircleMarkers />
        <MapToolbar />
        <CircleMarkersVulnerability />
      </MapContainer>
  )
}
export default OsmMap;
