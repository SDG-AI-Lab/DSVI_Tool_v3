import { Polygon } from 'react-leaflet'

type CustomPolygon_AOIprops = {
  positions: any[]
  fillColor: string
  hoverColor: string
  opacity: number
}

const CustomPolygon_AOI = ({
  positions,
  fillColor,
  hoverColor,
  opacity,
}: CustomPolygon_AOIprops) => {
  return (
    <Polygon
      pathOptions={{
        bubblingMouseEvents: true,
        weight: 2,
        color: '#007EC6',
        opacity: opacity,
        fillOpacity: opacity,
      }}
      pane="area-of-interest-pane"
      fillColor={fillColor}
      positions={positions}
      // control color of polygon!!!
      eventHandlers={{
        mouseover: (e) => {
          let layer = e.target
          layer.setStyle({
            fillColor: 'white',
          })
        },
        mouseout: (e) => {
          let layer = e.target
          layer.setStyle({
            fillColor: fillColor,
          })
        },
      }}
    />
  )
}
export default CustomPolygon_AOI
