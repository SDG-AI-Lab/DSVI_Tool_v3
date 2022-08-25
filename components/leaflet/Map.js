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

import edudata_1 from '/public/static/edu_1.json'
import edudata_2 from '/public/static/edu_2.json'
import edudata_3 from '/public/static/edu_3.json'

import finandata_1 from '/public/static/finan_1.json'
import finandata_2 from '/public/static/finan_2.json'
import finandata_3 from '/public/static/finan_3.json'

import healthdata_1 from '/public/static/health_1.json'
import healthdata_2 from '/public/static/health_2.json'
import healthdata_3 from '/public/static/health_3.json'
import CircleMarkers from '../marker/CircleMarkers';

const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)
  const { state: legenddata, dispatch: setLegendData } = useContext(LegendContext);
  const level = state["level"];
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
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
  var SE_social_vulnerability = socioeconomic.find(
    (e) => e.slug === 'social_vulnerability');
    var social_vulnerability_random_forest = SE_social_vulnerability.data.find(
      (e) => e.slug === 'social_vulnerability_random_forest'
    );
    var { status: social_vulnerability_random_forest_status, 
      value: social_vulnerability_random_forest_value} = social_vulnerability_random_forest;

    var social_vulnerability_random_forest = SE_social_vulnerability.data.find(
      (e) => e.slug === 'social_vulnerability_random_forest'
    );
    var { status: social_vulnerability_random_forest_status, 
      value: social_vulnerability_random_forest_value} = social_vulnerability_random_forest;

    var social_vulnerability_xgboost = SE_social_vulnerability.data.find(
        (e) => e.slug === 'social_vulnerability_xgboost'
    );
    var { status: social_vulnerability_xgboost_status, 
        value: social_vulnerability_xgboost_value} = social_vulnerability_xgboost;

  var drive_time = socioeconomic.find(
    (e) => e.slug === 'drive_time');
    var dt_education_facility = drive_time.data.find(
        (e) => e.slug === 'dt_education_facility'
    );
    var { status: dt_education_facility_status, 
        value: dt_education_facility_value} = dt_education_facility;
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
        {/* <ControlMenu position="topRight" show_data={show_data} show_sidebar_data={show_sidebar_data}
          children={
            educational_facilities_status || financial_institutions_status || health_institutions_status ?
              <Legend />
              :
              null
          }
        >
        </ControlMenu> */}
      
      {/* NEW. Socioeconomic. START */}
      {social_vulnerability_random_forest_status && level === 3 &&
        SocEco_random_forest_3.features.map((randomForstLibrary, index) => {
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
                opacity={social_vulnerability_random_forest_value/100}
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
      {social_vulnerability_xgboost_status && level === 3 &&
        SocEco_XGBoost_3.features.map((library, index) => {
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
              opacity={social_vulnerability_xgboost_value/100}
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
      {dt_education_facility_status && level === 1 &&
        DriveTime_1.features.map((library, index) => {
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
                opacity={dt_education_facility_value/100}
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
