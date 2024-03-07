// type GeoJsonFeaturesType = {
//   type: string
//   properties: {
//     NAME_1: string
//     NAME: string
//     _count: number
//     _sum: number
//     _mean: number
//     _median: number
//     _stdev: number
//     _min: number
//     _max: number
//     _range: number
//     _minority: number
//     _majority: number
//     NAME_2?: string
//   }
//   geometry: {
//     type: string
//     coordinates: any[]
//   }
// }

// type SingleGeoJson = {
//   type: string
//   name: string
//   crs: any
//   features: GeoJsonFeaturesType[]
// }

// declare module 'public/static/*.geojson' {
//   const singleGeojson: SingleGeoJson
//   export default singleGeojson
// }
