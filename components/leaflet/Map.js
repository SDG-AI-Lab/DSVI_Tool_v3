import React, { useContext, useEffect } from 'react'
// import { BoxZoomControl } from 'react-leaflet-box-zoom'
import L from 'leaflet'
import {MapContainer, LayersControl, WMSTileLayer, ZoomControl, ScaleControl, useMap} from 'react-leaflet'
//import PrintControlDefault from "react-leaflet-easyprint";
import Legend from '../controls/Legend';
import styles from './Map.module.scss'
import {FilterContext} from '../../context/FilterContext'
import {LegendContext} from '../../context/LegendContext'
import {Settings, TileProviders} from '../../config/MapConfiguration';
import ControlMenu from '../controls/InfoBox';
import CustomPolygon from '../controls/CustomPolygon';
import CustomPolygon_AOI from '../controls/CustomPolygon_AOI';
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
// import se_land_use_class_1 from '/public/static/lu_1.geojson'
// import se_land_use_class_2 from '/public/static/lu_2.geojson'
// import se_land_use_class_3 from '/public/static/lu_3.geojson'
import se_elevation_1 from '/public/static/dem_1.geojson'
import se_elevation_2 from '/public/static/dem_2.geojson'
import se_elevation_3 from '/public/static/dem_3.geojson'

import BetterWMSTileLayer from '../controls/BetterWMSTileLayer';
import NewLegend_2 from '../controls/NewLegend_2';
import { max } from 'lodash';

import MapControls from '../controls/MapControls';
import InfoBox from '../controls/InfoBox';

const defaultMap = { lat: 22.167057857886153, lng: 79.6728515625, zoom: 5 };
// const PrintControl = withLeaflet(PrintControlDefault);

const OsmMap = () => {
  const { state, dispatch } = useContext(FilterContext);
  const level = state["level"];
  const reset_settings = state["reset_settings"];
  const map_settings = state["map_settings"];
  const tile_providers = state["tile_providers"];

  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
  const show_infoBox_data = state['show_infoBox_data'];
  const show_area_of_interest = state['show_area_of_interest'];
  const socioeconomic = state['socioeconomic']['data'];
  const geodata = state['geodata']['data'];

  // This column decides which data column of the geojson we use: in this case: _mean.
  // To be found in reducer.js

  const socioeconomic_data_column = state['socioeconomic']['data_column'];
  const activeLegends = state['activeLegends'];
  const dhsIndicator = state["dhs_indicator"];

  /* Socioeconomic. START */
  const se_social_vulnerability = socioeconomic.find((e) => e.slug === 'se_social_vulnerability');
  const se_random_forest = se_social_vulnerability.data.find((e) => e.slug === 'se_random_forest');
  const {status: se_random_forest_status, value: se_random_forest_value} = se_random_forest;
  const se_xgboost = se_social_vulnerability.data.find((e) => e.slug === 'se_xgboost');
  // const {status: se_xgboost_status, value: se_xgboost_value} = se_xgboost;

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
  // const se_land_use_class = se_bio_physical.data.find((e) => e.slug === 'se_land_use_class');
  // const {status: se_land_use_class_status, value: se_land_use_class_value} = se_land_use_class;
  const se_elevation = se_bio_physical.data.find((e) => e.slug === 'se_elevation');
  const {status: se_elevation_status, value: se_elevation_value} = se_elevation;
  
  
  /* Socioeconomic. END */

  /* Geodata Layers. START */
  const social_vulnerability = geodata.find((e) => e.slug === 'sv_social_vulnerability');

  // const sv_linear_model = social_vulnerability.data.find((e) => e.slug === 'sv_linear_model');
  // const {status: sv_linear_model_status, value: sv_linear_model_value} = sv_linear_model;

  const sv_xgboost = social_vulnerability.data.find((e) => e.slug === 'sv_xgboost');
  const {status: sv_xgboost_status, value: sv_xgboost_value} = sv_xgboost;

  const sv_random_forest = social_vulnerability.data.find((e) => e.slug === 'sv_random_forest');
  const {status: sv_random_forest_status, value: sv_random_forest_value} = sv_random_forest;

  const distance_maps = geodata.find((e) => e.slug === 'sv_distance_maps');
  const distance_to_healthcare = distance_maps.data.find((e) => e.slug === 'sv_distance_to_healthcare');
  const {status: distance_to_healthcare_status, value: distance_to_healthcare_value} = distance_to_healthcare;
  const distance_to_finance = distance_maps.data.find((e) => e.slug === 'sv_distance_to_finance');
  const {status: distance_to_finance_status, value: distance_to_finance_value} = distance_to_finance;
  const distance_to_edu = distance_maps.data.find((e) => e.slug === 'sv_distance_to_edu');
  const {status: distance_to_edu_status, value: distance_to_edu_value} = distance_to_edu;

  const roads = distance_maps.data.find((e) => e.slug === 'sv_roads');
  const {status: roads_status, value: roads_value} = roads;

  const bio_physical = geodata.find((e) => e.slug === 'sv_bio_physical');
  const elevation = bio_physical.data.find((e) => e.slug === 'sv_elevation');
  const {status: elevation_status, value: elevation_value} = elevation;
  const slope = bio_physical.data.find((e) => e.slug === 'sv_slope');
  const {status: slope_status, value: slope_value} = slope;
  const max_temp = bio_physical.data.find((e) => e.slug === 'sv_max_temp');
  const {status: max_temp_status, value: max_temp_value} = max_temp;
  const plant_health = bio_physical.data.find((e) => e.slug === 'sv_plant_health');
  const {status: plant_health_status, value: plant_health_value} = plant_health;
  const precipitation = bio_physical.data.find((e) => e.slug === 'sv_precipitation');
  const {status: precipitation_status, value: precipitation_value} = precipitation;

  const socio_economic = geodata.find((e) => e.slug === 'sv_socio_economic');
  const nightlight_intensity = socio_economic.data.find((e) => e.slug === 'sv_nightlight_intensity');
  const {status: nightlight_intensity_status, value: nightlight_intensity_value} = nightlight_intensity;
  const pop_density = socio_economic.data.find((e) => e.slug === 'sv_pop_density');
  const {status: pop_density_status, value: pop_density_value} = pop_density;
  const celltower = socio_economic.data.find((e) => e.slug === 'sv_celltower');
  const {status: celltower_status, value: celltower_value} = celltower;
  const road_density = socio_economic.data.find((e) => e.slug === 'sv_road_density');
  const {status: road_density_status, value: road_density_value} = road_density;
  const relative_wealth = socio_economic.data.find((e) => e.slug === 'sv_relative_wealth');
  const {status: relative_wealth_status, value: relative_wealth_value} = relative_wealth;
  const gdp = socio_economic.data.find((e) => e.slug === 'sv_gdp');
  const {status: gdp_status, value: gdp_value} = gdp;
  /* Geodata Layers. END */

   /*Categories. START*/
   const vulnerability = state["vulnerability"];
   const categories = state['categories'];
 
   const cats_very_low = categories.find((e) => e.slug === 'cats_very_low');
   const {status: cats_very_low_status} = cats_very_low;
 
   const cats_low = categories.find((e) => e.slug === 'cats_low');
   const {status: cats_low_status} = cats_low;
 
   const cats_medium = categories.find((e) => e.slug === 'cats_medium');
   const {status: cats_medium_status} = cats_medium;
 
   const cats_high = categories.find((e) => e.slug === 'cats_high');
   const {status: cats_high_status} = cats_high;
 
   const cats_very_high = categories.find((e) => e.slug === 'cats_very_high');
   const {status: cats_very_high_status} = cats_very_high;
   /*Categories. END*/

  /* !! Moved on 263 line !!  */
  // const getNormalizeData = (number, maxNumber, minNumber, layerObject) => {
  //   const val = Math.abs((number - minNumber) / (maxNumber - minNumber));
  //   console.log("number:", number)
  //   console.log("minNumber:", minNumber)
  //   console.log("maxNumber:", maxNumber)
  //   console.log("polygonvalue:", val)
  //   return mapPolygonColorToDensity(val, layerObject);
  // };

  // Mouse HOVER color is WHITE - but it should be fillcolor*transparency
  const mapPolygonColorToDensity = ((normalizeData, layerObject) => {
    // console.log(layerObject);
    if (!layerObject.reverse_meaning) {
      switch (true) {
        case normalizeData > 0.8 && normalizeData <= 1: return '#FF362C'; // RED 
        case normalizeData > 0.6 :  return '#ff962c'; // ORANGE
        case normalizeData > 0.4 : return '#FFDE2C'; // YELLOW
        case normalizeData > 0.2 :  return '#00800A'; // GREEN
        case normalizeData >= 0 : return '#0c58ca'; // BLUE
        default: return '#FFFFFF'; // WHITE
      }
    } else {
      switch (true) {
        case normalizeData > 0.8 && normalizeData <= 1: return '#0c58ca'; // BLUE
        case normalizeData > 0.6:  return '#00800A'; // GREEN
        case normalizeData > 0.4: return '#FFDE2C'; // YELLOW
        case normalizeData > 0.2:  return '#ff962c'; // ORANGE
        case normalizeData >= 0: return '#FF362C'; // RED
        default: return '#FFFFFF'; // WHITE
      }
    }
  });

  const AOI_projection = (library, index) => {

    const fillColorAOI = 'rgb(255, 255, 255)';
    const hoverColor='blue';

    return (
        <CustomPolygon_AOI
        key={index}
        positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
        fillColor={fillColorAOI}
        hoverColor = {hoverColor}
        opacity='0.7'
        />
    )
  };

  const newProjection = (full_JSON_library, library, index, layerObject) => {

    const {NAME, NAME_1, NAME_2, _mean, _count, _stdev, _max, _min, _sum, _avg } = library.properties;
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
    const onlyAllMeanNumbers = full_JSON_library.features.map(object => object.properties._mean);
    // console.log('onlyAllMeanNumbers');
    // console.log(onlyAllMeanNumbers);
    const minMeanNumber = Math.min(...onlyAllMeanNumbers);
    const maxMeanNumber = Math.max(...onlyAllMeanNumbers);

    const normalizeDataValue = Math.abs((_mean - minMeanNumber) / (maxMeanNumber - minMeanNumber));
    const fillColor = mapPolygonColorToDensity(normalizeDataValue, layerObject);
    // console.log('NAME_1', NAME_1);
    // console.log('_mean', _mean);
    // console.log('minMeanNumber', minMeanNumber);
    // console.log('maxMeanNumber', maxMeanNumber);
    // console.log('normalizeDataValue', normalizeDataValue);
    // console.log('fillColor', fillColor);

    return (
        <CustomPolygon
            key={index}
            positions={L.GeoJSON.coordsToLatLngs(library.geometry.coordinates[0][0])}
            fillColor={fillColor}
            hoverColor = {fillColor}
            opacity={layerObject.value/100}
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
  };

  function UpdateMap() {
    const map = useMap()
    useEffect(() => {
      if (reset_settings) {
        map.setView(map_settings.latlong, map_settings.zoom);
      }
    }, [reset_settings]);

    return null
  }

  return (<MapContainer
        center={map_settings.latlong}
        zoom={map_settings.zoom}
        zoomControl={false}
        scrollWheelZone={true}
        className={styles.container}
        attributionControl={false}
      >
      <UpdateMap/>

      {/* <BoxZoomControl
          style={{
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "4px",
            background: "url('./images/boxZoomIcon.png')",
            backgroundColor: "rgb(255, 255, 255)",
            outline: "none",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "32px",
            title: "hfbhdkgj"
          }}
          position="topleft"
          // sticky={true}
          title="jdfucegbf"
        /> */}
        <LayersControl position="topright">
          {!reset_settings && tile_providers.map(({ name, checked, args }) => (
            <LayersControl.BaseLayer {...{ name, checked }} key={name}>
              <WMSTileLayer {...{ ...args }} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        <ScaleControl/>
        <ZoomControl position="bottomleft"/>
        {/* <ControlMenu position="topLeft" show_data={show_data} show_infoBox_data={show_infoBox_data}>
        </ControlMenu> */}
        <MapControls position="topright"/>
        <InfoBox position="topleft"/>

        { 
          se_random_forest_status || // se_xgboost_status 
          se_education_facility_status || se_health_institution_status ||
          se_financial_service_status || se_population_counts_status || se_celltowers_status || se_nightlight_intensity_status ||
          se_relative_wealth_status || se_GDP_status || se_plant_health_status || se_temperature_max_status ||
          // se_land_use_class_status 
          se_elevation_status ||
          // sv_linear_model_status || 
          sv_xgboost_status || sv_random_forest_status ||
          distance_to_healthcare_status || distance_to_finance_status || distance_to_edu_status || elevation_status ||
          slope_status || max_temp_status || plant_health_status || precipitation_status || nightlight_intensity_status ||
          pop_density_status || celltower_status || road_density_status || relative_wealth_status || gdp_status ||
          (vulnerability &&
          (cats_very_low_status || cats_low_status || cats_medium_status || cats_high_status || cats_very_high_status)) ||
          dhsIndicator
          ? <NewLegend_2/>
          : null
        }

        {/* Show Area of Interest. START */}
        {show_area_of_interest && AOI.features.map((library, index) => {
          return AOI_projection(library, index);
        })}
        {/* Show Area of Interest. END */}

        {/* NEW. Socioeconomic. START */}
        {/*Random Forest*/}
        {se_random_forest_status && level === 1 && se_random_forest_1.features.map((library, index) => {
          return newProjection(se_random_forest_1, library, index, se_random_forest);
        })}
        {se_random_forest_status && level === 2 && se_random_forest_2.features.map((library, index) => {
          return newProjection(se_random_forest_2, library, index, se_random_forest);
        })}
        {se_random_forest_status && level === 3 && se_random_forest_3.features.map((library, index) => {
          return newProjection(se_random_forest_3, library, index, se_random_forest);
        })}

        {/*XG Boost*/}
        {/* {se_xgboost_status && level === 1 && se_xgboost_1.features.map((library, index) => {
        return newProjection(se_xgboost_1, library, index, se_xgboost);
        })}
        {se_xgboost_status && level === 2 && se_xgboost_2.features.map((library, index) => {
          return newProjection(se_xgboost_2, library, index, se_xgboost);
        })}
        {se_xgboost_status && level === 3 && se_xgboost_3.features.map((library, index) => {
          return newProjection(se_xgboost_3, library, index, se_xgboost);
        })} */}

        {/*Education Facilities*/}
        {se_education_facility_status && level === 1 && se_edu_1.features.map((library, index) => {
          return newProjection(se_edu_1, library, index, se_education_facility);
        })}
        {se_education_facility_status && level === 2 && se_edu_2.features.map((library, index) => {
          return newProjection(se_edu_2, library, index, se_education_facility);
        })}
        {se_education_facility_status && level === 3 && se_edu_3.features.map((library, index) => {
          return newProjection(se_edu_3, library, index, se_education_facility);
        })}

        {/*Health Institutions*/}
        {se_health_institution_status && level === 1 && se_health_1.features.map((library, index) => {
          return newProjection(se_health_1, library, index, se_health_institution);
        })}
        {se_health_institution_status && level === 2 && se_health_2.features.map((library, index) => {
          return newProjection(se_health_2, library, index, se_health_institution);
        })}
        {se_health_institution_status && level === 3 && se_health_3.features.map((library, index) => {
          return newProjection(se_health_3, library, index, se_health_institution);
        })}

        {/*Financial Services*/}
        {se_financial_service_status && level === 1 && se_finance_1.features.map((library, index) => {
          return newProjection(se_finance_1, library, index, se_financial_service);
        })}
        {se_financial_service_status && level === 2 && se_finance_2.features.map((library, index) => {
          return newProjection(se_finance_2, library, index, se_financial_service);
        })}
        {se_financial_service_status && level === 3 && se_finance_3.features.map((library, index) => {
          return newProjection(se_finance_3, library, index, se_financial_service);
        })}

        {/*Population Counts*/}
        {se_population_counts_status && level === 1 && se_population_1.features.map((library, index) => {
          return newProjection(se_population_1, library, index, se_population_counts);
        })}
        {se_population_counts_status && level === 2 && se_population_2.features.map((library, index) => {
          return newProjection(se_population_2, library, index, se_population_counts);
        })}
        {se_population_counts_status && level === 3 && se_population_3.features.map((library, index) => {
          return newProjection(se_population_3, library, index, se_population_counts);
        })}

        {/*Cell Towers*/}
        {se_celltowers_status && level === 1 && se_celltowers_1.features.map((library, index) => {
          return newProjection(se_celltowers_1, library, index, se_celltowers);
        })}
        {se_celltowers_status && level === 2 && se_celltowers_2.features.map((library, index) => {
          return newProjection(se_celltowers_2, library, index, se_celltowers);
        })}
        {se_celltowers_status && level === 3 && se_celltowers_3.features.map((library, index) => {
          return newProjection(se_celltowers_3, library, index, se_celltowers);
        })}

        {/*Nightlight Intensity*/}
        {se_nightlight_intensity_status && level === 1 && se_nightlight_intensity_1.features.map((library, index) => {
          return newProjection(se_nightlight_intensity_1, library, index, se_nightlight_intensity);
        })}
        {se_nightlight_intensity_status && level === 2 && se_nightlight_intensity_2.features.map((library, index) => {
          return newProjection(se_nightlight_intensity_2, library, index, se_nightlight_intensity);
        })}
        {se_nightlight_intensity_status && level === 3 && se_nightlight_intensity_3.features.map((library, index) => {
          return newProjection(se_nightlight_intensity_3, library, index, se_nightlight_intensity);
        })}

        {/*Relative Wealth*/}
        {se_relative_wealth_status && level === 1 && se_relative_wealth_1.features.map((library, index) => {
          return newProjection(se_relative_wealth_1, library, index, se_relative_wealth);
        })}
        {se_relative_wealth_status && level === 2 && se_relative_wealth_2.features.map((library, index) => {
          return newProjection(se_relative_wealth_2, library, index, se_relative_wealth);
        })}
        {se_relative_wealth_status && level === 3 && se_relative_wealth_3.features.map((library, index) => {
          return newProjection(se_relative_wealth_3, library, index, se_relative_wealth);
        })}

        {/*GDP*/}
        {se_GDP_status && level === 1 && se_GDP_1.features.map((library, index) => {
          return newProjection(se_GDP_1, library, index, se_GDP);
        })}
        {se_GDP_status && level === 2 && se_GDP_2.features.map((library, index) => {
          return newProjection(se_GDP_2, library, index, se_GDP);
        })}
        {se_GDP_status && level === 3 && se_GDP_3.features.map((library, index) => {
          return newProjection(se_GDP_3, library, index, se_GDP);
        })}

        {/*Plant Health*/}
        {se_plant_health_status && level === 1 && se_plant_health_1.features.map((library, index) => {
          return newProjection(se_plant_health_1, library, index, se_plant_health);
        })}
        {se_plant_health_status && level === 2 && se_plant_health_2.features.map((library, index) => {
          return newProjection(se_plant_health_2, library, index, se_plant_health);
        })}
        {se_plant_health_status && level === 3 && se_plant_health_3.features.map((library, index) => {
          return newProjection(se_plant_health_3, library, index, se_plant_health);
        })}

        {/*Temperature Max*/}
        {se_temperature_max_status && level === 1 && se_temperature_max_1.features.map((library, index) => {
          return newProjection(se_temperature_max_1, library, index, se_temperature_max);
        })}
        {se_temperature_max_status && level === 2 && se_temperature_max_2.features.map((library, index) => {
          return newProjection(se_temperature_max_2, library, index, se_temperature_max);
        })}
        {se_temperature_max_status && level === 3 && se_temperature_max_3.features.map((library, index) => {
          return newProjection(se_temperature_max_3, library, index, se_temperature_max);
        })}

        {/*Land Use*/}
        {/* {se_land_use_class_status && level === 1 && se_land_use_class_1.features.map((library, index) => {
          return newProjection(se_land_use_class_1, library, index, se_land_use_class);
        })} */}
        {/* {se_land_use_class_status && level === 2 && se_land_use_class_2.features.map((library, index) => {
          return newProjection(se_land_use_class_2, library, index, se_land_use_class);
        })} */}
        {/* {se_land_use_class_status && level === 3 && se_land_use_class_3.features.map((library, index) => {
          return newProjection(se_land_use_class_3, library, index, se_land_use_class);
        })} */}

        {/*Elevation*/}
        {se_elevation_status && level === 1 && se_elevation_1.features.map((library, index) => {
          return newProjection(se_elevation_1, library, index, se_elevation);
        })}
        {se_elevation_status && level === 2 && se_elevation_2.features.map((library, index) => {
          return newProjection(se_elevation_2, library, index, se_elevation);
        })}
        {se_elevation_status && level === 3 && se_elevation_3.features.map((library, index) => {
          return newProjection(se_elevation_3, library, index, se_elevation);
        })}
        {/* NEW. Socioeconomic. END */}

        {/* Geodata layer. START */}
        {/* {sv_linear_model_status ?
            <WMSTileLayer
              params={{
                layers: "sdg-ai-lab:Linear_SV",
                format: "image/png",
                transparent: true,
                version: "1.1.0",
                style: "sdg-ai-lab:xgboost",
              }}
              url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
              zIndex="9999"
              opacity={sv_linear_model_value / 100}/>
          : null
        } */}

        {sv_xgboost_status ?
            <BetterWMSTileLayer
              url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
              layers="sdg-ai-lab:XGBoost_tuned_scaled_clipped_final"
              transparent= "true"
              zIndex="9999"
              styles="sdg-ai-lab:xgboost"
              opacity={sv_xgboost_value / 100}
            />
        : null
        }
        
        {sv_random_forest_status ?
          <BetterWMSTileLayer
              url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
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
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_health_dd_spd_10k"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:255_0_style"
            opacity={distance_to_healthcare_value / 100}
            />
        : null
        }

        {roads_status ?
          <WMSTileLayer
          params={{
            layers: "sdg-ai-lab:lines_merged",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            //style: "sdg-ai-lab:xgboost",
          }}
          url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
          zIndex="9999"
          opacity={roads_value / 100}/>
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
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            zIndex="9999"
            opacity={sv_xgboost_value / 100}/> */}

        {distance_to_edu_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_edu_dd_spd_10k_4326"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:255_0_style"
            opacity={distance_to_edu_value / 100}
          />
        : null
        }

        {elevation_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_DEM_Large"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:255_0_style"
            opacity={elevation_value / 100}
          />
        : null
        }

        {slope_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_slope"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:255_0_style"
            opacity={slope_value / 100}
          />
        : null
        }

        {max_temp_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_maxtemp_feb"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={max_temp_value / 100}
          />
        : null
        }

        {plant_health_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_NDVI"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={plant_health_value / 100}
          />
        : null
        }

        {precipitation_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_precip"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={precipitation_value / 100}
          />
        : null
        }

        {nightlight_intensity_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_NTL"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={nightlight_intensity_value / 100}
          />
        : null
        }

        {pop_density_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_pop"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={pop_density_value / 100}
          />
        : null
        }

        {celltower_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_cellt"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={celltower_value / 100}
          />
        : null
        }

        {road_density_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_road_density"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={road_density_value / 100}
          />
        : null
        }

        {relative_wealth_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_rwi_heatmap_filled_final"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={relative_wealth_value / 100}
          />
        : null
        }

        {gdp_status ?
          <BetterWMSTileLayer
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
            layers="sdg-ai-lab:scaled_r_norm_GDP_2015_intp"
            transparent= "true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={gdp_value / 100}
          />
        : null
        }
        {/* Old Tile layer logic */}
        {/* {sv_linear_model ?
          <WMSTileLayer
            params={{
              layers: "sdg-ai-lab:Linear_SV",
              format: "image/png",
              transparent: true,
              version: "1.1.0",
              style: "sdg-ai-lab:xgboost",
            }}
            url="https://www.sdglab.ml/geoserver/sdg-ai-lab/wms"
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
