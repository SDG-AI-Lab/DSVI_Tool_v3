declare module 'public/static' {
  interface GeoJson {
    [key: string]: {
      type: string
      name: string
      crs: any
      features: any
    }
  }
  const geojson: GeoJson
  export { geojson }
}
