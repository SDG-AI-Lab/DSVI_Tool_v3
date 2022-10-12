import {useContext} from 'react'
import {Polygon} from "react-leaflet";
import {LegendContext} from '../../context/LegendContext'

const CustomPolygon_AOI = (props) => {

    const {} = useContext(LegendContext);
    const {
        index,
        positions,
        fillColor,
        hovercolor,
    } = props;

    return (<Polygon
            key={index}
            pathOptions={{
                bubblingMouseEvents: true, weight: 2, color: 'blue'
            }}

            fillColor={'rgb(255, 255, 255, .0)'}
            hovercolor={'rgb(255, 255, 255, .0)'}
            positions={positions}


            // control color of polygon!!!
            eventHandlers={{
                mouseover: (e) => {
                    let layer = e.target;
                    layer.setStyle({
                        fillColor: hovercolor
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
