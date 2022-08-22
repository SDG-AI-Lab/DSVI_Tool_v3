import React, { useContext } from 'react'
import L from 'leaflet'
import { MapContainer, LayersControl, WMSTileLayer, ZoomControl, Popup, Marker, GeoJSON } from 'react-leaflet'
import Legend from '../map/Legend';
import styles from './Map.module.scss'
import { FilterContext } from '../../context/FilterContext'
import { LegendContext } from '../../context/LegendContext'
import { Settings, TileProviders } from '../../config/map';
import ControlMenu from '../map/ControlMenu';
import CustomPolygon from '../map/Polygon';


//


import edudata_1 from '/public/static/edu_1.json'
import edudata_2 from '/public/static/edu_2.json'
import edudata_3 from '/public/static/edu_3.json'

import finandata_1 from '/public/static/finan_1.json'
import finandata_2 from '/public/static/finan_2.json'
import finandata_3 from '/public/static/finan_3.json'

import healthdata_1 from '/public/static/health_1.json'
import healthdata_2 from '/public/static/health_2.json'
import healthdata_3 from '/public/static/health_3.json'

const OsmMap = ({ center, draggable, onDragMarker, location }) => {
  const { state, dispatch } = useContext(FilterContext)
  const { state: legenddata, dispatch: setLegendData } = useContext(LegendContext);
  const level = state["level"];
  const show_data = state['show_data'];
  const show_sidebar_data = state['show_sidebar_data'];
  const socioeconomic = state['socioeconomic']['data'];
  const geodata = state['geodata']['data'];

  /* Socioeconomic. START */
  var educational_facilities = socioeconomic.find(
    (e) => e.slug === 'educational_facilities'
  );
  var { status: educational_facilities_status, value: educational_facilities_value,
    legend: educational_facilities_legend } = educational_facilities;
  
  var financial_institutions = socioeconomic.find(
    (e) => e.slug === 'financial_institutions'
  );
  var { status: financial_institutions_status, value: financial_institutions_value,
    legend: financial_institutions_legend } = financial_institutions;
  
  var health_institutions = socioeconomic.find(
    (e) => e.slug === 'health_care_institutions'
  );
  var { status: health_institutions_status, value: health_institutions_value,
    legend: health_institutions_legend } = health_institutions;
  
  const NormalizeData = (number, maxNumber, minNumber) => {
    var val = (number - minNumber) / (maxNumber - minNumber);
    return mapPolygonColorToDensity(val);
  };

  const mapPolygonColorToDensity = (normalizeData => {
    return normalizeData == 0
      ? '#00800A'
      : normalizeData == 1
        ? '#FF362C'
        : normalizeData > 8
          ? '#7BCA0C'
          : normalizeData > 11
            ? '#E8FF2C'
            : normalizeData > 14
              ? '#FFDE2C'
              : normalizeData > 17
                ? '#FFAF2C'
                : '#FFEDA0';
  });
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


        {educational_facilities_status && level == 1 &&
          edudata_1.features.map((edulibrary, index) => {
            const { NAME_1, NAME_2, GID_1, _count, _stdev, _max, _min } = edulibrary.properties;
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
                "value": GID_1
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
                positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={educational_facilities_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={edulibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={educational_facilities_legend[0]["title"]}
                legendDescription={educational_facilities_legend[0]["description"]}
              />
            )

          })

        }
        {educational_facilities_status && level == 2 &&
          edudata_2.features.map((edulibrary, index) => {
            const { NAME_1, NAME_2, GID_2, _count, _stdev, _max, _min } = edulibrary.properties;
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
                "value": GID_2
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
                positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={educational_facilities_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={edulibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                //hoverColor="white"
                legendTitle={educational_facilities_legend[0]["title"]}
                legendDescription={educational_facilities_legend[0]["description"]}
              />
            )

          })
        }

        {educational_facilities_status && level == 3 &&
          edudata_3.features.map((edulibrary, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = edulibrary.properties;
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
                positions={L.GeoJSON.coordsToLatLngs(edulibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={educational_facilities_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={edulibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={educational_facilities_legend[0]["title"]}
                legendDescription={educational_facilities_legend[0]["description"]}
              />
            )

          })
        }

        {financial_institutions_status && level == 1 &&
          finandata_1.features.map((finanlibrary, index) => {
            const { NAME_1, NAME_2, GID_1, _count, _stdev, _max, _min } = finanlibrary.properties;
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
                "value": GID_1
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
                positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={financial_institutions_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={finanlibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={financial_institutions_legend[0]["title"]}
                legendDescription={financial_institutions_legend[0]["description"]}
              />
            )

          })
        }

        {financial_institutions_status && level == 2 &&
          finandata_2.features.map((finanlibrary, index) => {
            const { NAME_1, NAME_2, GID_2, _count, _stdev, _max, _min } = finanlibrary.properties;
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
                "value": GID_2
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
                positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={financial_institutions_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={finanlibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={financial_institutions_legend[0]["title"]}
                legendDescription={financial_institutions_legend[0]["description"]}
              />
            )
          })
        }

        {financial_institutions_status && level == 3 &&
          finandata_3.features.map((finanlibrary, index) => {
            const { NAME_1, NAME_2, GID_3, _count, _stdev, _max, _min } = finanlibrary.properties;
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
                positions={L.GeoJSON.coordsToLatLngs(finanlibrary.geometry.coordinates[0][0])}
                fillColor={fillColor}
                opacity={financial_institutions_value / 100}
                tooltipDirection="center"
                tooltipOffset={[0, 0]}
                tooltipCount={finanlibrary.properties._count}
                tooltipBgcolor="bg-red-900"
                tooltipTextColor="text-white"
                show_data={show_data}
                popupMaxWidth="500"
                popupMaxHeight="auto"
                popupBgColor="bg-white"
                popupTextColor="text-slate-700"
                data={data}
                hoverColor="white"
                legendTitle={financial_institutions_legend[0]["title"]}
                legendDescription={financial_institutions_legend[0]["description"]}
              />
            )
          })
        }


        {/* Health Layer 1 */}

        {health_institutions_status && level == 1 &&
          healthdata_1.features.map((healthlibrary, index) => {
            const { NAME_1, NAME_2, GID_1, _count, _stdev, _max, _min } = healthlibrary.properties;
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
                "value": GID_1
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
        }

        {/* {health_institutions_status && level == 1 &&
          healthdata_1.features.map(() => {
            return (
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
                opacity={health_institutions_value / 100}/>
            )
          })
        } */}
        
        {health_institutions_status && level == 2 &&
          healthdata_2.features.map((healthlibrary, index) => {
            const { NAME_1, NAME_2, GID_2, _count, _stdev, _max, _min } = healthlibrary.properties;
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
                "value": GID_2
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
        }
        {health_institutions_status && level == 3 &&
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
        }




      </MapContainer>
  )
}
export default OsmMap;