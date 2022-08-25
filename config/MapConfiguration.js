export const TileProviders = [
    {
      name: 'Osm',
      args: {
        url:
          'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
    {
      name: 'Satellite',
      checked: true,
      args: {
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
          '&copy; <a href="https://www.esri.com">ESRI</a>',
      },
    },
    {
      name: 'Mapbox',
      args: {
        url:
          'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        attribution:
          '&copy; <a href="https://mapbox.com">Mapbox</a>',
          layers:"GoogleMapsCompatible"
        },
    }
   
  ]
  
  export const Settings = {
    latlong: [38.917275, 71.014469], // 38.917275, 71.014469
    zoom: 7,
  }