import L from 'leaflet'
import CustomPolygon_AOI from './CustomPolygon_AOI'

type AOIprojectionProps = {
  geojsonFeature: any /*set geojson features type*/
}

const AOIprojection = ({ geojsonFeature }: AOIprojectionProps) => {
  const fillColorAOI = 'rgb(255, 255, 255)'
  const hoverColor = 'blue'

  return (
    <CustomPolygon_AOI
      positions={L.GeoJSON.coordsToLatLngs(
        geojsonFeature.geometry.coordinates[0][0]
      )}
      fillColor={fillColorAOI}
      hoverColor={hoverColor}
      opacity={0.7}
    />
  )
}

export default AOIprojection
