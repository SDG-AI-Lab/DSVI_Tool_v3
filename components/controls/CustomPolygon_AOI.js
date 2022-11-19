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
                bubblingMouseEvents: true, weight: 2, color: 'blue', opacity: opacity, fillOpacity: opacity
            }}

            fillColor={'rgb(255, 255, 255)'}
            positions={positions}

            // control color of polygon!!!
            eventHandlers={{
                mouseover: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: hoverColor
                    });
                },
                mouseout: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: fillColor
                    });
                },

            }}
        />)
}
export default CustomPolygon_AOI
