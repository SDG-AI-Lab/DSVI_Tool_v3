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

import se_random_forest_3 from '/public/static/adm3_random_forest_zonal_stats.json'
import se_xgboost_3 from '/public/static/adm3_XGBoost_zonal_stats.json'
import se_edu_1 from '/public/static/edu_1.geojson'
import se_edu_2 from '/public/static/edu_2.json'
import se_edu_3 from '/public/static/edu_3.json'
import se_health_1 from '/public/static/health_1.json'
import se_health_2 from '/public/static/health_2.json'
import se_health_3 from '/public/static/health_3.json'
import se_finance_1 from '/public/static/finan_1.json'
import se_finance_2 from '/public/static/finan_2.json'
import se_finance_3 from '/public/static/finan_3.json'
import se_population_1 from '/public/static/TJ_gadm_1_zonal statsics_ppp_population.json'
import se_population_2 from '/public/static/TJ_gadm_2_zonal statsics_ppp_population.json'
import se_population_3 from '/public/static/TJ_gadm_3_zonal statsics_ppp_population.json'
import se_celltowers_1 from '/public/static/TJ_gadm_1_zonal statsics_tj_cellt.json'
import se_celltowers_2 from '/public/static/TJ_gadm_2_zonal statsics_tj_cellt.json'
import se_celltowers_3 from '/public/static/TJ_gadm_3_zonal statsics_tj_cellt.json'
import se_nightlight_intensity_1 from '/public/static/TJ_gadm_1_zonal statsics_NTL_VNL_npp_2016_average.json'
import se_nightlight_intensity_2 from '/public/static/TJ_gadm_2_zonal statsics_NTL_VNL_npp_2016_average.json'
import se_nightlight_intensity_3 from '/public/static/TJ_gadm_3_zonal statsics_NTL_VNL_npp_2016_average.json'
import se_relative_wealth_1 from '/public/static/TJ_gadm_1_zonal statsics_RWI_IDW.json'
import se_relative_wealth_3 from '/public/static/TJ_gadm_3_zonal statsics_RWI_IDW.json'
import se_GDP_1 from '/public/static/adm_1_gdp_2015.json'
import se_GDP_2 from '/public/static/adm_2_gdp_2015.json'
import se_GDP_3 from '/public/static/adm_3_gdp_2015.json'
import se_plant_health_1 from '/public/static/TJ_gadm_1_zonal statsics_NDVI _class.json'
import se_plant_health_2 from '/public/static/TJ_gadm_2_zonal statsics_NDVI _class.json'
import se_plant_health_3 from '/public/static/TJ_gadm_3_zonal statsics_NDVI _class.json'
import se_temperature_max_1 from '/public/static/TJ_gadm_1_zonal statsics_max_temp _class.json'
import se_temperature_max_2 from '/public/static/TJ_gadm_2_zonal statsics_max_temp _class.json'
import se_temperature_max_3 from '/public/static/TJ_gadm_3_zonal statsics_max_temp _class.json'
import se_land_use_class_1 from '/public/static/TJ_gadm_1_zonal statsics_Tj_landuse _class.json'
import se_land_use_class_2 from '/public/static/TJ_gadm_2_zonal statsics_Tj_landuse _class.json'
import se_land_use_class_3 from '/public/static/TJ_gadm_3_zonal statsics_Tj_landuse _class.json'
import se_elevation_1 from '/public/static/TJ_gadm_1_zonal statsics_DEM.json'
import se_elevation_2 from '/public/static/TJ_gadm_2_zonal statsics_DEM.json'
import se_elevation_3 from '/public/static/TJ_gadm_3_zonal statsics_DEM.json'


const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)
  const { state: legenddata, dispatch: setLegendData } = useContext(LegendContext);
  const level = state["level"];
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
  const show_infoBox_data = state['show_infoBox_data']
  const socioeconomic = state['socioeconomic']['data'];
  const geodata = state['geodata']['data'];

  const NormalizeData = (number, maxNumber, minNumber) => {
    const val = Math.abs((number - minNumber) / (maxNumber - minNumber));
    return mapPolygonColorToDensity(val);
  };

  const mapPolygonColorToDensity = (normalizeData => {
    switch (true) {
      case normalizeData > 0.85: return '#00800A';
      case normalizeData > 0.7: return '#FF362C';
      case normalizeData > 0.55: return '#0c58ca';
      case normalizeData > 0.4: return '#ff962c';
      case normalizeData > 0.25: return '#FFDE2C';
      default: return '#f2a0ff';
    }
  })

  /* Socioeconomic. START */
  var se_social_vulnerability = socioeconomic.find(
    (e) => e.slug === 'se_social_vulnerability');
    var se_random_forest = se_social_vulnerability.data.find(
      (e) => e.slug === 'se_random_forest'
    );
    var { status: se_random_forest_status, 
      value: se_random_forest_value} = se_random_forest;

    var se_xgboost = se_social_vulnerability.data.find(
        (e) => e.slug === 'se_xgboost'
    );
    var { status: se_xgboost_status, 
        value: se_xgboost_value} = se_xgboost;

  var se_drive_time = socioeconomic.find(
    (e) => e.slug === 'se_drive_time');
    var se_education_facility = se_drive_time.data.find(
        (e) => e.slug === 'se_education_facility'
    );
    var { status: se_education_facility_status, 
        value: se_education_facility_value} = se_education_facility;

    var se_health_institution = se_drive_time.data.find(
      (e) => e.slug === 'se_health_institution'
    );
    var { status: se_health_institution_status, 
        value: dt_health_institution_value} = se_health_institution;

    var se_financial_service = se_drive_time.data.find(
      (e) => e.slug === 'se_financial_service'
    );
    var { status: se_financial_service_status, 
        value: se_financial_service_value} = se_financial_service;

  var se_socio_economic = socioeconomic.find(
    (e) => e.slug === 'se_socio_economic');
    var se_population_counts = se_socio_economic.data.find(
      (e) => e.slug === 'se_population_counts'
    );
    var { status: se_population_counts_status, 
        value: population_counts_value} = se_population_counts;

    var se_celltowers = se_socio_economic.data.find(
      (e) => e.slug === 'se_celltowers'
    );
    var { status: se_celltowers_status, 
        value: se_celltowers_value} = se_celltowers;

    var se_nightlight_intensity = se_socio_economic.data.find(
      (e) => e.slug === 'se_nightlight_intensity'
    );
    var { status: se_nightlight_intensity_status, 
        value: se_nightlight_intensity_value} = se_nightlight_intensity;

    var se_relative_wealth = se_socio_economic.data.find(
      (e) => e.slug === 'se_relative_wealth'
    );
    var { status: se_relative_wealth_status, 
        value: se_relative_wealth_value} = se_relative_wealth;

    var se_GDP = se_socio_economic.data.find(
      (e) => e.slug === 'se_GDP'
    );
    var { status: se_GDP_status, 
        value: se_GDP_value} = se_GDP;

  var se_bio_physical = socioeconomic.find(
    (e) => e.slug === 'se_bio_physical');
    var se_plant_health = se_bio_physical.data.find(
      (e) => e.slug === 'se_plant_health'
    );
    var { status: se_plant_health_status, 
        value: se_plant_health_value} = se_plant_health;

    var se_temperature_max = se_bio_physical.data.find(
      (e) => e.slug === 'se_temperature_max'
    );
    var { status: se_temperature_max_status, 
        value: se_temperature_max_value} = se_temperature_max;
    
    var se_land_use_class = se_bio_physical.data.find(
      (e) => e.slug === 'se_land_use_class'
    );
    var { status: se_land_use_class_status, 
        value: se_land_use_class_value} = se_land_use_class;

    var se_elevation = se_bio_physical.data.find(
      (e) => e.slug === 'se_elevation'
    );
    var { status: se_elevation_status, 
        value: se_elevation_value} = se_elevation;
  /* Socioeconomic. END */

  /* Geodata Layers. START */
  var social_vulnerability = geodata.find(
    (e) => e.slug === 'social_vulnerability'
  );
    var sv_linear_model = social_vulnerability.data.find(
      (e) => e.slug === 'sv_linear_model'
    );
    var { status: sv_linear_model_status, value: sv_linear_model_value} = sv_linear_model;

    var sv_xgboost = social_vulnerability.data.find(
      (e) => e.slug === 'sv_xgboost'
    );
    var { status: sv_xgboost_status, value: sv_xgboost_value} = sv_xgboost;

    var sv_random_forest = social_vulnerability.data.find(
      (e) => e.slug === 'sv_random_forest'
    );
    var { status: sv_random_forest_status, value: sv_random_forest_value} = sv_random_forest;

  var distance_maps = geodata.find(
    (e) => e.slug === 'distance_maps'
  );
    var distance_to_healthcare = distance_maps.data.find(
      (e) => e.slug === 'distance_to_healthcare'
    );
    var { status: distance_to_healthcare_status, value: distance_to_healthcare_value} = distance_to_healthcare;

    var distance_to_finance = distance_maps.data.find(
      (e) => e.slug === 'distance_to_finance'
    );
    var { status: distance_to_finance_status, value: distance_to_finance_value} = distance_to_finance;

    var distance_to_edu = distance_maps.data.find(
      (e) => e.slug === 'distance_to_edu'
    );
    var { status: distance_to_edu_status, value: distance_to_edu_value} = distance_to_edu;

  var bio_physical = geodata.find(
    (e) => e.slug === 'bio_physical'
  );
    var elevation = bio_physical.data.find(
      (e) => e.slug === 'elevation'
    );
    var { status: elevation_status, value: elevation_value} = elevation;

    var slope = bio_physical.data.find(
      (e) => e.slug === 'slope'
    );
    var { status: slope_status, value: slope_value} = slope;

    var max_temp = bio_physical.data.find(
      (e) => e.slug === 'max_temp'
    );
    var { status: max_temp_status, value: max_temp_value} = max_temp;

    var plant_health = bio_physical.data.find(
      (e) => e.slug === 'plant_health'
    );
    var { status: plant_health_status, value: plant_health_value} = plant_health;

    var precipitation = bio_physical.data.find(
      (e) => e.slug === 'precipitation'
    );
    var { status: precipitation_status, value: precipitation_value} = precipitation;

  var socio_economic = geodata.find(
    (e) => e.slug === 'socio_economic'
  );
    var nightlight_intensity = socio_economic.data.find(
      (e) => e.slug === 'nightlight_intensity'
    );
    var { status: nightlight_intensity_status, value: nightlight_intensity_value} = nightlight_intensity;

    var pop_density = socio_economic.data.find(
      (e) => e.slug === 'pop_density'
    );
    var { status: pop_density_status, value: pop_density_value} = pop_density;

    var celltower = socio_economic.data.find(
      (e) => e.slug === 'celltower'
    );
    var { status: celltower_status, value: celltower_value} = celltower;

    var road_density = socio_economic.data.find(
      (e) => e.slug === 'road_density'
    );
    var { status: road_density_status, value: road_density_value} = road_density;

    var relative_wealth = socio_economic.data.find(
      (e) => e.slug === 'relative_wealth'
    );
    var { status: relative_wealth_status, value: relative_wealth_value} = relative_wealth;

    var gdp = socio_economic.data.find(
      (e) => e.slug === 'gdp'
    );
    var { status: gdp_status, value: gdp_value} = gdp;
  /* Geodata Layers. END */

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
      
      {/* NEW. Socioeconomic. START */}
      {se_random_forest_status && level === 3 &&
        se_random_forest_3.features.map((randomForstLibrary, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = randomForstLibrary.properties;
            const data = [
              {
                "key": "NAME_1",
                "value": NAME_1
              },
              {
                "key": "NAME_2",
                "value": NAME_2
              },
              {
                "key": "GID_3",
                "value": GID_3
              },
              {
                "key": "COUNT",
                "value": _count
              }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
              <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(randomForstLibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_random_forest_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={randomForstLibrary.properties._count}
                tooltipName_1={randomForstLibrary.properties.NAME_1}
                tooltipName_2={randomForstLibrary.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
              />
            )
          })
        }
      {se_xgboost_status && level === 3 &&
        se_xgboost_3.features.map((library, index) => {
          const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
          const data = [
              {
              "key": "NAME_1",
              "value": NAME_1
              },
              {
              "key": "NAME_2",
              "value": NAME_2
              },
              {
              "key": "GID_3",
              "value": GID_3
              },
              {
              "key": "COUNT",
              "value": _count
              }
          ];
          const fillColor = NormalizeData(_stdev, _max, _min);
          return (
              <CustomPolygon
              key={index}
              positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
              fillColor={fillColor}
              opacity={se_xgboost_value/100}
              tooltipDirection="auto"
              tooltipOffset={[20, 0]}
              tooltipCount={library.properties._count}
              tooltipName_1={library.properties.NAME_1}
              tooltipName_2={library.properties.NAME_2}
              tooltipBgcolor="rgb(255 255 255)"
              tooltipTextColor="text-slate-700"
              show_data={show_data}
              popupMaxWidth="500"
              popupMaxHeight="auto"
              popupBgColor="bg-white"
              popupTextColor="text-slate-700"
              data={data}
              />
          )
        })
      }
      {se_education_facility_status && level === 1 &&
        se_edu_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_education_facility_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_education_facility_status && level === 2 &&
        se_edu_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_education_facility_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_education_facility_status && level === 3 &&
        se_edu_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_education_facility_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_health_institution_status && level === 1 &&
        se_health_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={dt_health_institution_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_health_institution_status && level === 2 &&
        se_health_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={dt_health_institution_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_health_institution_status && level === 3 &&
        se_health_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={dt_health_institution_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_financial_service_status && level === 1 &&
        se_finance_1.features.map((library, index) => {
          const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
          const data = [
              {
              "key": "NAME_1",
              "value": NAME_1
              },
              {
              "key": "NAME_2",
              "value": NAME_2
              },
              {
              "key": "GID_3",
              "value": GID_3
              },
              {
              "key": "COUNT",
              "value": _count
              }
          ];
          const fillColor = NormalizeData(_stdev, _max, _min);
          return (
              <CustomPolygon
              key={index}
              positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
              fillColor={fillColor}
              opacity={se_financial_service_value/100}
              tooltipDirection="auto"
              tooltipOffset={[20, 0]}
              tooltipCount={library.properties._count}
              tooltipName_1={library.properties.NAME_1}
              tooltipName_2={library.properties.NAME_2}
              tooltipBgcolor="rgb(255 255 255)"
              tooltipTextColor="text-slate-700"
              show_data={show_data}
              popupMaxWidth="500"
              popupMaxHeight="auto"
              popupBgColor="bg-white"
              popupTextColor="text-slate-700"
              data={data}
              />
          )
        })
      }
      {se_financial_service_status && level === 2 &&
        se_finance_2.features.map((library, index) => {
          const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
          const data = [
              {
              "key": "NAME_1",
              "value": NAME_1
              },
              {
              "key": "NAME_2",
              "value": NAME_2
              },
              {
              "key": "GID_3",
              "value": GID_3
              },
              {
              "key": "COUNT",
              "value": _count
              }
          ];
          const fillColor = NormalizeData(_stdev, _max, _min);
          return (
              <CustomPolygon
              key={index}
              positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
              fillColor={fillColor}
              opacity={se_financial_service_value/100}
              tooltipDirection="auto"
              tooltipOffset={[20, 0]}
              tooltipCount={library.properties._count}
              tooltipName_1={library.properties.NAME_1}
              tooltipName_2={library.properties.NAME_2}
              tooltipBgcolor="rgb(255 255 255)"
              tooltipTextColor="text-slate-700"
              show_data={show_data}
              popupMaxWidth="500"
              popupMaxHeight="auto"
              popupBgColor="bg-white"
              popupTextColor="text-slate-700"
              data={data}
              />
          )
        })
      }
      {se_financial_service_status && level === 3 &&
        se_finance_3.features.map((library, index) => {
          const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
          const data = [
              {
              "key": "NAME_1",
              "value": NAME_1
              },
              {
              "key": "NAME_2",
              "value": NAME_2
              },
              {
              "key": "GID_3",
              "value": GID_3
              },
              {
              "key": "COUNT",
              "value": _count
              }
          ];
          const fillColor = NormalizeData(_stdev, _max, _min);
          return (
              <CustomPolygon
              key={index}
              positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
              fillColor={fillColor}
              opacity={se_financial_service_value/100}
              tooltipDirection="auto"
              tooltipOffset={[20, 0]}
              tooltipCount={library.properties._count}
              tooltipName_1={library.properties.NAME_1}
              tooltipName_2={library.properties.NAME_2}
              tooltipBgcolor="rgb(255 255 255)"
              tooltipTextColor="text-slate-700"
              show_data={show_data}
              popupMaxWidth="500"
              popupMaxHeight="auto"
              popupBgColor="bg-white"
              popupTextColor="text-slate-700"
              data={data}
              />
          )
        })
      }
      {se_population_counts_status && level === 1 &&
        se_population_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={population_counts_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_population_counts_status && level === 2 &&
        se_population_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={population_counts_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_population_counts_status && level === 3 &&
        se_population_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={population_counts_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_celltowers_status && level === 1 &&
        se_celltowers_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_celltowers_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_celltowers_status && level === 2 &&
        se_celltowers_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_celltowers_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_celltowers_status && level === 3 &&
        se_celltowers_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_celltowers_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_nightlight_intensity_status && level === 1 &&
        se_nightlight_intensity_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_nightlight_intensity_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }      
      {se_nightlight_intensity_status && level === 2 &&
        se_nightlight_intensity_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_nightlight_intensity_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }      
      {se_nightlight_intensity_status && level === 3 &&
        se_nightlight_intensity_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_nightlight_intensity_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }      
      {se_relative_wealth_status && level === 1 &&
        se_relative_wealth_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_relative_wealth_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }   
      {se_relative_wealth_status && level === 3 &&
        se_relative_wealth_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_relative_wealth_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }   
      {se_GDP_status && level === 1 &&
        se_GDP_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_GDP_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }   
      {se_GDP_status && level === 2 &&
        se_GDP_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_GDP_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }   
      {se_GDP_status && level === 3 &&
        se_GDP_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_GDP_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_plant_health_status && level === 1 &&
        se_plant_health_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_plant_health_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }    
      {se_plant_health_status && level === 2 &&
        se_plant_health_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_plant_health_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }    
      {se_plant_health_status && level === 3 &&
        se_plant_health_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_plant_health_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_temperature_max_status && level === 1 &&
        se_temperature_max_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_temperature_max_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
        }
      {se_temperature_max_status && level === 2 &&
        se_temperature_max_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_temperature_max_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_temperature_max_status && level === 3 &&
        se_temperature_max_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_temperature_max_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }    
      {se_land_use_class_status && level === 1 &&
        se_land_use_class_1.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_land_use_class_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_land_use_class_status && level === 2 &&
        se_land_use_class_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_land_use_class_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_land_use_class_status && level === 3 &&
        se_land_use_class_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_land_use_class_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
      }
      {se_elevation_status && level === 1 &&
        se_elevation_1.features.map((library, index) => {
        const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
        const data = [
            {
            "key": "NAME_1",
            "value": NAME_1
            },
            {
            "key": "NAME_2",
            "value": NAME_2
            },
            {
            "key": "GID_3",
            "value": GID_3
            },
            {
            "key": "COUNT",
            "value": _count
            }
        ];
        const fillColor = NormalizeData(_stdev, _max, _min);
        return (
            <CustomPolygon
            key={index}
            positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
            fillColor={fillColor}
            opacity={se_elevation_value/100}
            tooltipDirection="auto"
            tooltipOffset={[20, 0]}
            tooltipCount={library.properties._count}
            tooltipName_1={library.properties.NAME_1}
            tooltipName_2={library.properties.NAME_2}
            tooltipBgcolor="rgb(255 255 255)"
            tooltipTextColor="text-slate-700"
            show_data={show_data}
            popupMaxWidth="500"
            popupMaxHeight="auto"
            popupBgColor="bg-white"
            popupTextColor="text-slate-700"
            data={data}
            />
        )
        })
    }
    {se_elevation_status && level === 2 &&
        se_elevation_2.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_elevation_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
    }
    {se_elevation_status && level === 3 &&
        se_elevation_3.features.map((library, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = library.properties;
            const data = [
                {
                "key": "NAME_1",
                "value": NAME_1
                },
                {
                "key": "NAME_2",
                "value": NAME_2
                },
                {
                "key": "GID_3",
                "value": GID_3
                },
                {
                "key": "COUNT",
                "value": _count
                }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
                <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={se_elevation_value/100}
                tooltipDirection="auto"
                tooltipOffset={[20, 0]}
                tooltipCount={library.properties._count}
                tooltipName_1={library.properties.NAME_1}
                tooltipName_2={library.properties.NAME_2}
                tooltipBgcolor="rgb(255 255 255)"
                tooltipTextColor="text-slate-700"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                />
            )
        })
    }
      {/* NEW. Socioeconomic. END */}
      
      {/* Geodata layer. START */}
      {sv_linear_model_status ?
          <WMSTileLayer
            params={{
              layers: "sdg-ai-lab:scaled_r_norm_health_dd_spd_10k",
              format: "image/png",
              transparent: true,
              version: "1.1.0",
              style: "sdg-ai-lab:xgboost",
            }}
            url="http://129.151.248.181/geoserver/sdg-ai-lab/wms"
            zIndex="9999"
            opacity={sv_linear_model_value / 100}/>
        : null
        }

      {sv_xgboost_status ?
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
          opacity={sv_xgboost_value / 100}/>
      : null
      }

      {sv_random_forest_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:Random_Forest_tuned_scaled_clp_final",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={sv_random_forest_value / 100}/>
      : null
      }
      
      {distance_to_healthcare_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_health_dd_spd_10k",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={distance_to_healthcare_value / 100}/>
      : null
      }

      {distance_to_finance_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_finan_dd_spd_10k_4326",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={distance_to_finance_value / 100}/>
      : null
      }
      
      {distance_to_edu_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_edu_dd_spd_10k_4326",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={distance_to_edu_value / 100}/>
      : null
      }

      {elevation_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_DEM_Large",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={elevation_value / 100}/>
      : null
      }

      {slope_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_slope",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={slope_value / 100}/>
      : null
      }

      {max_temp_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_maxtemp_feb",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={max_temp_value / 100}/>
      : null
      }
      
      {plant_health_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_NDVI",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={plant_health_value / 100}/>
      : null
      }

      {precipitation_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_precip",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={precipitation_value / 100}/>
      : null
      }

      {nightlight_intensity_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_NTL",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={nightlight_intensity_value / 100}/>
      : null
      }

      {pop_density_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_pop",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={pop_density_value / 100}/>
      : null
      }

      {celltower_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_cellt",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={celltower_value / 100}/>
      : null
      }

      {road_density_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_road_density",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={road_density_value / 100}/>
      : null
      }

      {relative_wealth_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_rwi_heatmap_filled_final",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={relative_wealth_value / 100}/>
      : null
      }

      {gdp_status ?
        <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:scaled_r_norm_GDP_2015_intp",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            style: "sdg-ai-lab:xgboost",
          }}
          url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={gdp_value / 100}/>
      : null
      }
      {/* Geodata layer. END */}

      {/* Legacy SocEconm Layers. Don't use pls. START */}
        {/* {health_institutions_status && level == 3 &&
          healthdata_3.features.map((healthlibrary, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = healthlibrary.properties;
            const data = [
              {
                "key": "NAME_1",
                "value": NAME_1
              },
              {
                "key": "NAME_2",
                "value": NAME_2
              },
              {
                "key": "GID",
                "value": GID_3
              },
              {
                "key": "COUNT",
                "value": _count
              }
            ];
            const fillColor = NormalizeData(_stdev, _max, _min);
            return (
              <CustomPolygon
                key={index}
                positions={L.GeoJSON.coordsToLatLngs(healthlibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={health_institutions_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={healthlibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={health_institutions_legend[0]["title"]}
                legendDescription={health_institutions_legend[0]["description"]}
              />
            )
          })
        } */}
      {/* Legacy SocEconm Layers. END */}

        <CircleMarkers />
      </MapContainer>
  )
}
export default OsmMap;
