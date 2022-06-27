import { useContext } from 'react'
import { Polygon } from "react-leaflet";
import CustomTooltip from "./Tooltip";
import CustomPopup from "./Popup";
import { LegendContext } from '../../context/LegendContext'
const CustomPolygon = (props) => {
  const { state: legenddata, dispatch: setLegendData } = useContext(LegendContext);
  const {
    index, positions, fillColor, opacity, tooltipDirection, tooltipOffset, tooltipCount, tooltipBgcolor, tooltipTextColor,
    show_data, popupMaxWidth, popupMaxHeight, popupBgColor, popupTextColor, data, hoverColor, legendTitle, legendDescription } = props;
  return (
    <Polygon
      key={index}
      pathOptions={
        {
          bubblingMouseEvents: false, weight: 1, color: 'blue', opacity: opacity, fillOpacity: opacity

        }

      }
      fillColor={fillColor}
      positions={positions}

      children={
        <>

          <CustomTooltip direction={tooltipDirection} offset={tooltipOffset} opacity={opacity} count={tooltipCount}
            bgcolor={tooltipBgcolor} textcolor={tooltipTextColor}
            show_data={show_data}

          />

          <CustomPopup maxWidth={popupMaxWidth} maxHeight={popupMaxHeight}
            bgcolor={popupBgColor}
            textcolor={popupTextColor}
            data={data}
          />
        </>
      }

      eventHandlers={{
        mouseover: (e) => {
          let layer = e.target;
          layer.setStyle({
            fillColor: 'purple',
            weight: 5
          });
          setLegendData({ type: "CHANGE_ALL_DATA", payload: { title: legendTitle, description: legendDescription, data: data } });
        },
        mouseout: (e) => {
          let layer = e.target;
          layer.setStyle({
            fillColor: fillColor,
            weight: 1
          });
          setLegendData({ type: "RESET_DATA", payload: {} });
        },

      }}

    />
  )
}
export default CustomPolygon;