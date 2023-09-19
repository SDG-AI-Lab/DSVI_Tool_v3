import React, { useContext, useEffect } from 'react'
// import { BoxZoomControl } from 'react-leaflet-box-zoom'
import L from 'leaflet'
import {
  MapContainer,
  LayersControl,
  WMSTileLayer,
  ZoomControl,
  ScaleControl,
  useMap,
  Pane,
} from 'react-leaflet'
//import PrintControlDefault from "react-leaflet-easyprint";
import Legend from '../controls/Legend'
import styles from './Map.module.scss'
import { FilterContext } from '../../context/FilterContext'
import { LegendContext } from '../../context/LegendContext'
import { Settings, TileProviders } from '../../config/MapConfiguration'
import ControlMenu from '../controls/InfoBox'
import CustomPolygon from '../controls/CustomPolygon'
import CustomPolygon_AOI from '../controls/CustomPolygon_AOI'
import CircleMarkers from '../marker/CircleMarkers'
import CircleMarkersVulnerability from '../marker/CircleMarkersVulnerability'
import MapToolbar from '../controls/MapToolbar'

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

import BetterWMSTileLayer from '../controls/BetterWMSTileLayer'
import NewLegend_2 from '../controls/NewLegend_2'
import { max } from 'lodash'

import MapControls from '../controls/MapControls'
import InfoBox from '../controls/InfoBox'
import { useMapFunctions } from '../hooks/useMapFunctions'

const defaultMap = { lat: 22.167057857886153, lng: 79.6728515625, zoom: 5 }
// const PrintControl = withLeaflet(PrintControlDefault);

const OsmMap = () => {
  const { state, dispatch } = useContext(FilterContext)

  const level = state['level']
  const reset_settings = state['reset_settings']
  const map_settings = state['map_settings']
  const tile_providers = state['tile_providers']

  const show_data = state['show_data']

  const show_sidebar_data = state['show_sidebar_data']
  const show_infoBox_data = state['show_infoBox_data']
  const show_area_of_interest = state['show_area_of_interest']
  const socioeconomic = state['socioeconomic']['data']
  const geodata = state['geodata']['data']

  // This column decides which data column of the geojson we use: in this case: _mean.
  // To be found in reducer.js

  const socioeconomic_data_column = state['socioeconomic']['data_column']
  const activeLegends = state['activeLegends']
  const dhsIndicator = state['dhs_indicator']

  const { newProjection, seLayersData, svLayersData } =
    useMapFunctions(show_data)

  /* Socioeconomic. START */
  const se = seLayersData(state)
  /* Socioeconomic. END */

  /* Geodata Layers. START */
  const sv = svLayersData(state)
  /* Geodata Layers. END */

  /*Categories. START*/
  const vulnerability = state['vulnerability']
  const categories = state['categories']

  const cats_very_low = categories.find((e) => e.slug === 'cats_very_low')
  const { status: cats_very_low_status } = cats_very_low

  const cats_low = categories.find((e) => e.slug === 'cats_low')
  const { status: cats_low_status } = cats_low

  const cats_medium = categories.find((e) => e.slug === 'cats_medium')
  const { status: cats_medium_status } = cats_medium

  const cats_high = categories.find((e) => e.slug === 'cats_high')
  const { status: cats_high_status } = cats_high

  const cats_very_high = categories.find((e) => e.slug === 'cats_very_high')
  const { status: cats_very_high_status } = cats_very_high
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

  const AOI_projection = (library, index) => {
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

  function UpdateMap() {
    const map = useMap()
    useEffect(() => {
      if (reset_settings) {
        map.setView(map_settings.latlong, map_settings.zoom)
      }
    }, [reset_settings])

    return null
  }

  // function togglePointerEventsAllVectorLayers(status) {
  //   let elements = document.getElementsByClassName("leaflet-interactive");
  //   for(let element of elements) {
  //     if(status) {
  //       element.classList.add('turn-on-vector-layers-pointer');
  //     } else {
  //         element.classList.add('turn-off-vector-layers-pointer');
  //     }
  //   }
  // }

  useEffect(() => {
    if (activeLegends.length > 0) {
      let elements = document.getElementsByClassName('leaflet-interactive')
      for (let element of elements) {
        if (activeLegends[activeLegends.length - 1].slug.indexOf('se_') === 0) {
          if (element.classList.contains('turn-off-vector-layers-pointer')) {
            element.classList.remove('turn-off-vector-layers-pointer')
          }
          element.classList.add('turn-on-vector-layers-pointer')
        }
        if (activeLegends[activeLegends.length - 1].slug.indexOf('sv_') === 0) {
          if (element.classList.contains('turn-on-vector-layers-pointer')) {
            element.classList.remove('turn-on-vector-layers-pointer')
          }
          element.classList.add('turn-off-vector-layers-pointer')
        }
      }

      // Fixing the Map attribution
      let containerBottomRight =
        document.getElementsByClassName('leaflet-right')
      containerBottomRight[1].classList.add('container-bottom-right')
      containerBottomRight[1].children[0].classList.add(
        'attribution-control-keep-bottom'
      )
    }
  }, [activeLegends])

  const geoServerUrl = 'http://18.117.99.37:8080/geoserver/sdg-ai-lab/wms'

  return (
    <MapContainer
      center={map_settings.latlong}
      zoom={map_settings.zoom}
      zoomControl={false}
      scrollWheelZone={true}
      className={styles.container}
      attributionControl={true}
    >
      <UpdateMap />

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
        {!reset_settings &&
          tile_providers.map(({ name, checked, args }) => (
            <LayersControl.BaseLayer {...{ name, checked }} key={name}>
              <WMSTileLayer {...{ ...args }} />
            </LayersControl.BaseLayer>
          ))}
      </LayersControl>
      <ScaleControl />
      <ZoomControl position="bottomleft" />
      {/* <ControlMenu position="topLeft" show_data={show_data} show_infoBox_data={show_infoBox_data}>
        </ControlMenu> */}
      <MapControls position="topright" />
      <InfoBox position="topleft" />

      {se.se_random_forest_status || // se_xgboost_status
      se.se_education_facility_status ||
      se.se_health_institution_status ||
      se.se_financial_service_status ||
      se.se_population_counts_status ||
      se.se_celltowers_status ||
      se.se_nightlight_intensity_status ||
      se.se_relative_wealth_status ||
      se.se_GDP_status ||
      se.se_plant_health_status ||
      se.se_temperature_max_status ||
      // se_land_use_class_status
      se.se_elevation_status ||
      // sv_linear_model_status ||
      sv.sv_xgboost_status ||
      sv.sv_random_forest_status ||
      sv.distance_to_healthcare_status ||
      sv.distance_to_finance_status ||
      sv.distance_to_edu_status ||
      sv.elevation_status ||
      sv.slope_status ||
      sv.max_temp_status ||
      sv.plant_health_status ||
      sv.precipitation_status ||
      sv.nightlight_intensity_status ||
      sv.pop_density_status ||
      sv.celltower_status ||
      // road_density_status
      sv.relative_wealth_status ||
      sv.gdp_status ||
      (vulnerability &&
        (cats_very_low_status ||
          cats_low_status ||
          cats_medium_status ||
          cats_high_status ||
          cats_very_high_status)) ||
      dhsIndicator ? (
        <NewLegend_2 />
      ) : null}

      {/* Show Area of Interest. START */}
      <Pane name="area-of-interest-pane" style={{ zIndex: 200 }}>
        {show_area_of_interest &&
          AOI.features.map((library, index) => {
            return AOI_projection(library, index)
          })}
        {/* Show Area of Interest. END */}
      </Pane>

      {/* NEW. Socioeconomic. START */}
      <Pane name="socioeconomic-pane" style={{ zIndex: 201 }}>
        {/*Random Forest*/}
        {se.se_random_forest_status &&
          level === 1 &&
          se_random_forest_1.features.map((library, index) => {
            return newProjection(
              se_random_forest_1,
              library,
              index,
              se.se_random_forest
            )
          })}
        {se.se_random_forest_status &&
          level === 2 &&
          se_random_forest_2.features.map((library, index) => {
            return newProjection(
              se_random_forest_2,
              library,
              index,
              se.se_random_forest
            )
          })}
        {se.se_random_forest_status &&
          level === 3 &&
          se_random_forest_3.features.map((library, index) => {
            return newProjection(
              se_random_forest_3,
              library,
              index,
              se.se_random_forest
            )
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
        {se.se_education_facility_status &&
          level === 1 &&
          se_edu_1.features.map((library, index) => {
            return newProjection(
              se_edu_1,
              library,
              index,
              se.se_education_facility
            )
          })}
        {se.se_education_facility_status &&
          level === 2 &&
          se_edu_2.features.map((library, index) => {
            return newProjection(
              se_edu_2,
              library,
              index,
              se.se_education_facility
            )
          })}
        {se.se_education_facility_status &&
          level === 3 &&
          se_edu_3.features.map((library, index) => {
            return newProjection(
              se_edu_3,
              library,
              index,
              se.se_education_facility
            )
          })}

        {/*Health Institutions*/}
        {se.se_health_institution_status &&
          level === 1 &&
          se_health_1.features.map((library, index) => {
            return newProjection(
              se_health_1,
              library,
              index,
              se.se_health_institution
            )
          })}
        {se.se_health_institution_status &&
          level === 2 &&
          se_health_2.features.map((library, index) => {
            return newProjection(
              se_health_2,
              library,
              index,
              se.se_health_institution
            )
          })}
        {se.se_health_institution_status &&
          level === 3 &&
          se_health_3.features.map((library, index) => {
            return newProjection(
              se_health_3,
              library,
              index,
              se.se_health_institution
            )
          })}

        {/*Financial Services*/}
        {se.se_financial_service_status &&
          level === 1 &&
          se_finance_1.features.map((library, index) => {
            return newProjection(
              se_finance_1,
              library,
              index,
              se.se_financial_service
            )
          })}
        {se.se_financial_service_status &&
          level === 2 &&
          se_finance_2.features.map((library, index) => {
            return newProjection(
              se_finance_2,
              library,
              index,
              se.se_financial_service
            )
          })}
        {se.se_financial_service_status &&
          level === 3 &&
          se_finance_3.features.map((library, index) => {
            return newProjection(
              se_finance_3,
              library,
              index,
              se.se_financial_service
            )
          })}

        {/*Population Counts*/}
        {se.se_population_counts_status &&
          level === 1 &&
          se_population_1.features.map((library, index) => {
            return newProjection(
              se_population_1,
              library,
              index,
              se.se_population_counts
            )
          })}
        {se.se_population_counts_status &&
          level === 2 &&
          se_population_2.features.map((library, index) => {
            return newProjection(
              se_population_2,
              library,
              index,
              se.se_population_counts
            )
          })}
        {se.se_population_counts_status &&
          level === 3 &&
          se_population_3.features.map((library, index) => {
            return newProjection(
              se_population_3,
              library,
              index,
              se.se_population_counts
            )
          })}

        {/*Cell Towers*/}
        {se.se_celltowers_status &&
          level === 1 &&
          se_celltowers_1.features.map((library, index) => {
            return newProjection(
              se_celltowers_1,
              library,
              index,
              se.se_celltowers
            )
          })}
        {se.se_celltowers_status &&
          level === 2 &&
          se_celltowers_2.features.map((library, index) => {
            return newProjection(
              se_celltowers_2,
              library,
              index,
              se.se_celltowers
            )
          })}
        {se.se_celltowers_status &&
          level === 3 &&
          se_celltowers_3.features.map((library, index) => {
            return newProjection(
              se_celltowers_3,
              library,
              index,
              se.se_celltowers
            )
          })}

        {/*Nightlight Intensity*/}
        {se.se_nightlight_intensity_status &&
          level === 1 &&
          se_nightlight_intensity_1.features.map((library, index) => {
            return newProjection(
              se_nightlight_intensity_1,
              library,
              index,
              se.se_nightlight_intensity
            )
          })}
        {se.se_nightlight_intensity_status &&
          level === 2 &&
          se_nightlight_intensity_2.features.map((library, index) => {
            return newProjection(
              se_nightlight_intensity_2,
              library,
              index,
              se.se_nightlight_intensity
            )
          })}
        {se.se_nightlight_intensity_status &&
          level === 3 &&
          se_nightlight_intensity_3.features.map((library, index) => {
            return newProjection(
              se_nightlight_intensity_3,
              library,
              index,
              se.se_nightlight_intensity
            )
          })}

        {/*Relative Wealth*/}
        {se.se_relative_wealth_status &&
          level === 1 &&
          se_relative_wealth_1.features.map((library, index) => {
            return newProjection(
              se_relative_wealth_1,
              library,
              index,
              se.se_relative_wealth
            )
          })}
        {se.se_relative_wealth_status &&
          level === 2 &&
          se_relative_wealth_2.features.map((library, index) => {
            return newProjection(
              se_relative_wealth_2,
              library,
              index,
              se.se_relative_wealth
            )
          })}
        {se.se_relative_wealth_status &&
          level === 3 &&
          se_relative_wealth_3.features.map((library, index) => {
            return newProjection(
              se_relative_wealth_3,
              library,
              index,
              se.se_relative_wealth
            )
          })}

        {/*GDP*/}
        {se.se_GDP_status &&
          level === 1 &&
          se_GDP_1.features.map((library, index) => {
            return newProjection(se_GDP_1, library, index, se.se_GDP)
          })}
        {se.se_GDP_status &&
          level === 2 &&
          se_GDP_2.features.map((library, index) => {
            return newProjection(se_GDP_2, library, index, se.se_GDP)
          })}
        {se.se_GDP_status &&
          level === 3 &&
          se_GDP_3.features.map((library, index) => {
            return newProjection(se_GDP_3, library, index, se.se_GDP)
          })}

        {/*Plant Health*/}
        {se.se_plant_health_status &&
          level === 1 &&
          se_plant_health_1.features.map((library, index) => {
            return newProjection(
              se_plant_health_1,
              library,
              index,
              se.se_plant_health
            )
          })}
        {se.se_plant_health_status &&
          level === 2 &&
          se_plant_health_2.features.map((library, index) => {
            return newProjection(
              se_plant_health_2,
              library,
              index,
              se.se_plant_health
            )
          })}
        {se.se_plant_health_status &&
          level === 3 &&
          se_plant_health_3.features.map((library, index) => {
            return newProjection(
              se_plant_health_3,
              library,
              index,
              se.se_plant_health
            )
          })}

        {/*Temperature Max*/}
        {se.se_temperature_max_status &&
          level === 1 &&
          se_temperature_max_1.features.map((library, index) => {
            return newProjection(
              se_temperature_max_1,
              library,
              index,
              se.se_temperature_max
            )
          })}
        {se.se_temperature_max_status &&
          level === 2 &&
          se_temperature_max_2.features.map((library, index) => {
            return newProjection(
              se_temperature_max_2,
              library,
              index,
              se.se_temperature_max
            )
          })}
        {se.se_temperature_max_status &&
          level === 3 &&
          se_temperature_max_3.features.map((library, index) => {
            return newProjection(
              se_temperature_max_3,
              library,
              index,
              se.se_temperature_max
            )
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
        {se.se_elevation_status &&
          level === 1 &&
          se_elevation_1.features.map((library, index) => {
            return newProjection(
              se_elevation_1,
              library,
              index,
              se.se_elevation
            )
          })}
        {se.se_elevation_status &&
          level === 2 &&
          se_elevation_2.features.map((library, index) => {
            return newProjection(
              se_elevation_2,
              library,
              index,
              se.se_elevation
            )
          })}
        {se.se_elevation_status &&
          level === 3 &&
          se_elevation_3.features.map((library, index) => {
            return newProjection(
              se_elevation_3,
              library,
              index,
              se.se_elevation
            )
          })}
      </Pane>
      {/* NEW. Socioeconomic. END */}

      {/* Geodata layer. START */}
      <Pane name="geodata-pane" style={{ zIndex: 201 }}>
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

        {sv.sv_xgboost_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            layers="sdg-ai-lab:SV_XGBOOST"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:xgboost"
            opacity={sv.sv_xgboost_value / 100}
          />
        ) : null}

        {sv.sv_random_forest_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            layers="sdg-ai-lab:SV_random_forest"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:random_forest"
            opacity={sv.sv_random_forest_value / 100}
          />
        ) : null}
        {sv.distance_to_finance_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_finan_res_0_05_penalty"
            layers="sdg-ai-lab:financial_penalty"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:finan"
            opacity={sv.distance_to_finance_value / 100}
          />
        ) : null}
        {sv.distance_to_healthcare_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            layers="sdg-ai-lab:health_penalty"
            // layers="sdg-ai-lab:up_health_res_0_05_penalty"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:health"
            opacity={sv.distance_to_healthcare_value / 100}
          />
        ) : null}

        {sv.roads_status ? (
          <WMSTileLayer
            params={{
              layers: 'sdg-ai-lab:lines_merged',
              format: 'image/png',
              transparent: true,
              version: '1.1.0',
              //style: "sdg-ai-lab:xgboost",
            }}
            url={geoServerUrl}
            zIndex="9999"
            opacity={sv.roads_value / 100}
          />
        ) : null}

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

        {sv.distance_to_edu_status ? (
          <>
            <BetterWMSTileLayer
              url={geoServerUrl}
              // layers="sdg-ai-lab:up_edu_res_0_05_penalty"
              layers="sdg-ai-lab:Education_penalty"
              transparent="true"
              zIndex="9999"
              styles="sdg-ai-lab:edu"
              opacity={sv.distance_to_edu_value / 100}
            />
            <WMSTileLayer
              params={{
                layers: 'sdg-ai-lab:edu_single_point',
                format: 'image/png',
                transparent: true,
                version: '1.1.0',
                //style: "sdg-ai-lab:xgboost",
              }}
              url={geoServerUrl}
              zIndex="9999"
              opacity={sv.roads_value / 100}
            />
          </>
        ) : null}

        {sv.elevation_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:r_norm_elev_srtmv2_300m"
            layers="sdg-ai-lab:elevation"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:elevation"
            opacity={sv.elevation_value / 100}
          />
        ) : null}

        {sv.slope_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_slope_clipped"
            layers="sdg-ai-lab:slope"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:slope"
            opacity={sv.slope_value / 100}
          />
        ) : null}

        {sv.max_temp_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_scaled_r_norm_maxtemp_feb"
            layers="sdg-ai-lab:temperature_max_winter"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:temp"
            opacity={sv.max_temp_value / 100}
          />
        ) : null}

        {sv.plant_health_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_new_ndvi"
            layers="sdg-ai-lab:NDVI"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:ndvi"
            opacity={sv.plant_health_value / 100}
          />
        ) : null}

        {sv.precipitation_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:precipitation_upsampled_0_0001"
            layers="sdg-ai-lab:precipitation"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:precip"
            opacity={sv.precipitation_value / 100}
          />
        ) : null}

        {sv.nightlight_intensity_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:scaled_r_norm_NTL"
            layers="sdg-ai-lab:Nightlight"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl"
            opacity={sv.nightlight_intensity_value / 100}
          />
        ) : null}

        {sv.pop_density_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_r_norm_population_interpolation"
            layers="sdg-ai-lab:population"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:pop"
            opacity={sv.pop_density_value / 100}
          />
        ) : null}

        {sv.celltower_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_r_celltower"
            layers="sdg-ai-lab:celltower"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:celltower"
            opacity={sv.celltower_value / 100}
          />
        ) : null}

        {/* 
        {roads_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:scaled_r_norm_road_density"
            layers="sdg-ai-lab:scaled_r_norm_road_density"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:ntl_0_255_style"
            opacity={roads_value / 100}
          />
        ) : null}
           */}

        {sv.relative_wealth_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_rwi"
            layers="sdg-ai-lab:rwi_relativewealth"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:rwi"
            opacity={sv.relative_wealth_value / 100}
          />
        ) : null}

        {sv.gdp_status ? (
          <BetterWMSTileLayer
            url={geoServerUrl}
            // layers="sdg-ai-lab:up_r_norm_GDP_2015_intp"
            layers="sdg-ai-lab:GDP"
            transparent="true"
            zIndex="9999"
            styles="sdg-ai-lab:gdp"
            opacity={sv.gdp_value / 100}
          />
        ) : null}
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
      </Pane>
      {/* Geodata layer. END */}

      <CircleMarkers />
      <MapToolbar />
      <CircleMarkersVulnerability />
    </MapContainer>
  )
}
export default OsmMap
