import { useContext, useEffect, useRef } from 'react'
import { Polygon, Popup, Tooltip } from 'react-leaflet'
import { FilterContext } from '../../context/FilterContext'

const CustomPolygon = (props) => {
  const { state, dispatch } = useContext(FilterContext)
  const vulnerability = state['vulnerability']
  const socioeconomic = state['socioeconomic']

  const {
    index,
    positions,
    fillColor,
    hoverColor,
    opacity,
    tooltipDirection,
    tooltipOffset,
    tooltipCount,
    tooltipName_1,
    tooltipName_2,
    tooltipName_3,
    tooltipBgcolor,
    tooltipTextColor,
    show_data,
    popupMaxWidth,
    popupMaxHeight,
    popupBgColor,
    popupTextColor,
    data,
    legendTitle,
    legendDescription,
    normalizeDataValue,
    units,
    _mean,
    minMeanNumber,
    maxMeanNumber,
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

  return (
    <Polygon
      key={index}
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
            <p className={`p-1 ${tooltipTextColor}`}>
              {`Oblast: ${tooltipName_1 ? tooltipName_1 : 'no data'}`}
              <br />
              {`District: ${tooltipName_2 ? tooltipName_2 : 'no data'}`}
              <br />
              {`Value: ${_mean ? `${_mean} ${units}` : 'no data'}`}
            </p>
          </Tooltip>

          <Popup className={`m-0 rounded-lg p-0`} pane="popupPane">
            <p className={`p-1 ${popupTextColor}`}>
              {`Oblast: ${tooltipName_1 ? tooltipName_1 : 'no data'}`}
              <br />
              {`District: ${tooltipName_2 ? tooltipName_2 : 'no data'}`}
              <br />
              {`Value: ${_mean ? `${_mean} ${units}` : 'no data'}`}
            </p>
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
