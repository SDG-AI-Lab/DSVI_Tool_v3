import React, { useContext } from 'react'
import L from 'leaflet'
import { MapContainer, LayersControl, WMSTileLayer, ZoomControl } from 'react-leaflet'
import Legend from '../map/Legend';
import styles from './Map.module.scss'
import { FilterContext } from '../../context/FilterContext'
import { LegendContext } from '../../context/LegendContext'
import { Settings, TileProviders } from '../../config/map';
import ControlMenu from '../map/ControlMenu';
import CustomPolygon from '../map/Polygon';

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

  var educational_facilities = socioeconomic.find(
    (e) => e.slug === 'educational_facilities'
  )
  var { status: educational_facilities_status, value: educational_facilities_value,
    legend: educational_facilities_legend } = educational_facilities;
  var financial_institutions = socioeconomic.find(
    (e) => e.slug === 'financial_institutions'
  )
  var { status: financial_institutions_status, value: financial_institutions_value,
    legend: financial_institutions_legend } = financial_institutions;
  var health_institutions = socioeconomic.find(
    (e) => e.slug === 'health_care_institutions'
  )
  var { status: health_institutions_status, value: health_institutions_value,
    legend: health_institutions_legend } = health_institutions;
  const NormalizeData = (number, maxNumber, minNumber) => {
    var val = (number - minNumber) / (maxNumber - minNumber);
    return mapPolygonColorToDensity(val);
  }

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
  })

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
        <ControlMenu position="topRight" show_data={show_data} show_sidebar_data={show_sidebar_data}
          children={
            educational_facilities_status || financial_institutions_status || health_institutions_status ?
              <Legend />
              :
              null
          }
        >
        </ControlMenu>

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
                hoverColor="purple"
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
                hoverColor="purple"
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
                hoverColor="purple"
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
                hoverColor="purple"
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
                hoverColor="purple"
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
                hoverColor="purple"
                legendTitle={financial_institutions_legend[0]["title"]}
                legendDescription={financial_institutions_legend[0]["description"]}
              />
            )
          })
        }

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
                hoverColor="purple"
                legendTitle={health_institutions_legend[0]["title"]}
                legendDescription={health_institutions_legend[0]["description"]}
              />
            )
          })
        }
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
                hoverColor="purple"
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
                hoverColor="purple"
                legendTitle={health_institutions_legend[0]["title"]}
                legendDescription={health_institutions_legend[0]["description"]}
              />
            )
          })
        }

        <CircleMarkers />
      </MapContainer>
  )
}
export default OsmMap;