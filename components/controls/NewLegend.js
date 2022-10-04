import { useEffect } from "react";
import L from "leaflet";
import { useMap } from 'react-leaflet/hooks'

const mapPolygonColorToDensity = (normalizeData => {
  switch (true) {
    case normalizeData > 0.9: return '#0c58ca'; // BLUE
    case normalizeData > 0.7:  return '#00800A'; // GREEN
    case normalizeData > 0.55: return '#FFDE2C'; // YELLOW
    case normalizeData > 0.25:  return '#ff962c'; // ORANGE
    case normalizeData > 0: return '#FF362C'; // RED
    default: return '#FFFFFF'; // WHITE
  }
})

const CustomControl = L.Control.extend({
  onAdd: function(map) {
    let div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 0.25, 0.55, 0.7, 0.9];
    div.innerHTML +='<h4>Socioeconomic Layers</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + mapPolygonColorToDensity(grades[i]+0.01) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  },

  onRemove: function(map) {
    // Nothing to do here
  }
});

const NewLegend = (props) => {
  const map = useMap();
  if (map) {
    useEffect(() => {
      const legend = new CustomControl();
      legend.setPosition("bottomleft");
      legend.addTo(map);
      return () => legend.remove();
    }, [map]);
  }
  return null;
}

export default NewLegend;