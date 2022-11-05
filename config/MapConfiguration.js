// import token .env"

var mtoken = process.env.mapboxapikey;
// console.log(mtoken)

export const TileProviders = [
     
      {
        name: 'Esri',
        checked: true,
        args: {
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
          attribution:
              'Tiles &copy; Esri',
          variant: 'World_Street_Map'
          }
        },
      {
      name: 'OSM',
      checked: false,
      args: {
        url:
          'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
    {
      name: 'Satellite',
      checked: false,
      args: {
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
          '&copy; <a href="https://www.esri.com">ESRI</a>',
      },
    },
    // {
    //   name: 'Mapbox',
      
    //   args: {
    //     url:
    //       'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token={mtoken}',
    //     attribution:
    //       '&copy; <a href="https://mapbox.com">Mapbox</a>',
    //       layers:"GoogleMapsCompatible"
    //     },
    // },
    {
      name: 'Stamen',
      checked: false,
      args: {
        url:
          'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}{r}.{ext}',
        attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
              '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
              'Map data {attribution.OpenStreetMap}',
        variant: 'toner',
        ext: 'png'
        },
      },

      {
        name: 'NASA',
        checked: false,
        args: {
          url:
          'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
           // 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
          // attribution:
          // 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System ' +
					// '(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
          // variant: 'VIIRS_CityLights_2012',
          // minZoom: 1,
			  	// maxZoom: 9,
				  // format: 'jpg',
				  // time: '',
				  // tilematrixset: 'GoogleMapsCompatible_Level'
          },
      }       
  ]
  
  export const Settings = {
    latlong: [38.917275, 71.014469],
    zoom: 7,
    wheelPxPerZoomLevel: 1
  }