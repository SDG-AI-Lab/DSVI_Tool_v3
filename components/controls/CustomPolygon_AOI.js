import {useContext} from 'react'
import {Polygon} from "react-leaflet";
import {LegendContext} from '../../context/LegendContext'

const CustomPolygon_AOI = (props) => {

    const {} = useContext(LegendContext);
    const {
        index,
        positions,
        fillColor,
        hoverColor,
        opacity
    } = props;

    return (<Polygon
            key={index}
            pathOptions={{
                bubblingMouseEvents: true, weight: 2, color: '#007EC6', opacity: opacity, fillOpacity: opacity
            }}

            fillColor={fillColor}
            positions={positions}

            // control color of polygon!!!
            eventHandlers={{
                mouseover: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: 'white'
                    });
                },
                mouseout: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: fillColor,
                        opacity: 0.5
                    });
                },

            }}
        />)
}
export default CustomPolygon_AOI
