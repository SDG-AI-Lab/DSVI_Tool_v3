declare module 'public/static/tajikistan' {
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

declare module 'public/static/niger' {
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
