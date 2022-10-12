import {useContext, useEffect, useRef} from 'react'
import {Polygon} from "react-leaflet";
import CustomTooltip from "./CustomTooltip";
import CustomPopup from "./CustomPopup";
import {LegendContext} from '../../context/LegendContext'

const CustomPolygon = (props) => {

    const {state: legenddata, dispatch: setLegendData} = useContext(LegendContext);
    const {
        index,
        positions,
        fillColor,
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
        hoverColor,
        legendTitle,
        legendDescription,
        normalizeDataValue
    } = props;


    const PolygonRef = useRef(null);

    useEffect(() => {
        PolygonRef.current.setStyle({
            fillColor: fillColor
        })
    }, [fillColor])

    return (<Polygon
            key={index}
            ref={PolygonRef}
            pathOptions={{
                bubblingMouseEvents: true, weight: 1, color: 'blue', opacity: opacity, fillOpacity: opacity
            }}

            fillColor={fillColor}
            positions={positions}

            children={
                <>
                    <CustomTooltip direction={tooltipDirection} offset={tooltipOffset} count={tooltipCount}
                        bgcolor={tooltipBgcolor} textcolor={tooltipTextColor} tooltipName_1={tooltipName_1}
                        tooltipName_2={tooltipName_2} tooltipName_3={tooltipName_3} normalizeDataValue={normalizeDataValue}
                    />
                    <CustomPopup maxWidth={popupMaxWidth} maxHeight={popupMaxHeight}
                        bgcolor={popupBgColor}
                        textcolor={popupTextColor}
                        data={data}
                    />
                </>
            }

            // control color of polygon!!!
            eventHandlers={{
                mouseover: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: "white"
                    });
                },
                mouseout: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: fillColor
                    });
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
        />)
}
export default CustomPolygon;
