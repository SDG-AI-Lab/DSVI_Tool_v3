import { useContext, useEffect, useRef } from 'react'
import { Polygon, Popup, Tooltip } from 'react-leaflet'
import { FilterContext } from '../../context/FilterContext'

const CustomPolygon = (props) => {
  const { state, dispatch } = useContext(FilterContext)
  const vulnerability = state['vulnerability']
  const socioeconomic = state['socioeconomic']

  const {
    positions,
    fillColor,
    hoverColor,
    opacity,
    tooltipDirection,
    tooltipOffset,
    tooltipName_1,
    tooltipName_2,
    tooltipTextColor,
    units,
    _mean,
  } = props

  const PolygonRef = useRef(null)

  useEffect(() => {
    if (socioeconomic.status == true && vulnerability == true) {
      if (PolygonRef.current) {
        PolygonRef.current.bringToBack()
      }
    }
  }, [vulnerability])

  useEffect(() => {
    PolygonRef.current.setStyle({
      fillColor: fillColor,
    })
  }, [fillColor])

  const toolTipPopupContent = (
    <p className={`p-1 ${tooltipTextColor}`}>
      {tooltipName_1 && `Oblast: ${tooltipName_1}`}
      <br />
      {tooltipName_2 && `District: ${tooltipName_2}`}
      <br />
      {_mean && `Value: ${_mean} ${units}`}
    </p>
  )

  return (
    <Polygon
      ref={PolygonRef}
      pathOptions={{
        bubblingMouseEvents: true,
        weight: 1,
        color: 'white',
        opacity: opacity,
        fillOpacity: opacity,
      }}
      pane="socioeconomic-pane"
      fillColor={fillColor}
      positions={positions}
      children={
        <>
          <Tooltip
            direction={tooltipDirection}
            offset={tooltipOffset}
            className={`m-0 border-none p-0`}
            pane="tooltipPane"
          >
            {toolTipPopupContent}
          </Tooltip>

          <Popup className={`m-0 rounded-lg p-0`} pane="popupPane">
            {toolTipPopupContent}
          </Popup>
        </>
      }
      // control color of polygon!!!
      eventHandlers={{
        mouseover: (e) => {
          let layer = e.target
          layer.setStyle({
            fillColor: hoverColor,
            fillOpacity: 1,
          })
        },
        mouseout: (e) => {
          let layer = e.target
          layer.setStyle({
            fillColor: fillColor,
            fillOpacity: opacity,
          })
        },

        // mouseover: (e) => {
        //   let layer = e.target;
        //   layer.setStyle({
        //     fillColor: 'white',
        //     weight: 1,
        //   });
        //   setLegendData({ type: "CHANGE_ALL_DATA", payload: { title: legendTitle, description: legendDescription, data: data } });
        //   setShowData({ type: "TOGGLE_SHOW_DATA", payload: { show_data: true} });
        // },
        // mouseout: (e) => {
        //   let layer = e.target;
        //   layer.setStyle({
        //     fillColor: fillColor,
        //   });
        //   setLegendData({ type: "RESET_DATA", payload: {} });
        //   setShowData({ type: "TOGGLE_SHOW_DATA", payload: { show_data: false} });
        // },
      }}
    />
  )
}
export default CustomPolygon
