import {
  createElementHook,
  createElementObject,
  createLeafComponent,
  createPathHook,
} from '@react-leaflet/core'
import L from 'leaflet'
import { useMap, useMapEvents } from 'react-leaflet'
import { FilterContext } from '../../context/FilterContext'
import { useState, useContext, useEffect } from 'react'

const BetterWMSTileLayer = (props) => {
  const { state, dispatch } = useContext(FilterContext)

  const { url, layers, transparent, zIndex, styles, opacity } = props
  const format = 'image/png'
  const version = '1.1.0'
  const pane = 'geodata-pane'

  const newWMSobject = new L.TileLayer.WMS(url, {
    layers: layers,
    transparent: transparent,
    format: format,
    version: version,
    zIndex: zIndex,
    // styles: styles,
    opacity: opacity,
    pane: pane,
  })

  const map = useMap()
  const eventListeners = useMapEvents({
    click(evt) {
      getFeatureInfo(evt, layers)
    },
  })

  const [legends, setLegends] = useState(null)
  let legend_url = `https://www.sdglab.ml/geoserver/sdg-ai-lab/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&FORMAT=application/json&LAYER=${layers}`
  useEffect(() => {
    fetch(legend_url)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            setLegends(
              result.Legend[0].rules[0].symbolizers[0].Raster.colormap.entries
            )
            dispatch({
              type: 'CHANGE_GEOLAYERS_DESCRIPTION',
              layer: layers,
              payload:
                result.Legend[0].rules[0].symbolizers[0].Raster.colormap
                  .entries,
            })
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
    return () => {
      setLegends(null)
    }
  }, [])

  function getFeatureInfo(evt, layers) {
    // Make an AJAX request to the server and hope for the best
    let url = getFeatureInfoUrl(evt.latlng)
    let legend_url = `https://www.sdglab.ml/geoserver/sdg-ai-lab/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&FORMAT=application/json&LAYER=${layers}`

    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          const err = data.features.length > 0 ? null : data
          showGetFeatureInfo(err, evt.latlng, data, legends)
        },
        (error) => {
          showGetFeatureInfo(error)
        }
      )
  }

  function getFeatureInfoUrl(latlng) {
    // Construct a GetFeatureInfo request URL given a point
    const point = map.latLngToContainerPoint(latlng, map.getZoom())
    const size = map.getSize()

    let params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      // styles: styles,
      transparent: transparent,
      version: version,
      format: format,
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: layers,
      query_layers: layers,
      info_format: 'application/json',
    }

    params[params.version === '1.3.0' ? 'i' : 'x'] = parseInt(point.x)
    params[params.version === '1.3.0' ? 'j' : 'y'] = parseInt(point.y)

    let updated_url = url + L.Util.getParamString(params, url, true)

    /**
     * CORS workaround (using a basic php proxy)
     *
     * Added 2 new options:
     *  - proxy
     *  - proxyParamName
     *
     */

    // check if "proxy" option is defined (PS: path and file name)
    //   if (typeof this.wmsParams.proxy !== "undefined") {

    //       // check if proxyParamName is defined (instead, use default value)
    //       if (typeof this.wmsParams.proxyParamName !== "undefined")
    //           this.wmsParams.proxyParamName = 'url';

    //       // build proxy (es: "proxy.php?url=" )
    //       _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';
    //       url = _proxy + encodeURIComponent(url);
    //   }
    return updated_url
  }

  function showGetFeatureInfo(err, latlng, data, legends) {
    if (err) {
      console.log(err)
      return
    }

    if (latlng && data) {
      const grayIndex = data.features[0].properties['GRAY_INDEX']
      const description = defineDescription(grayIndex, legends)

      if (grayIndex != -1 && description != 'No description') {
        // Otherwise show the content in a popup, or something.
        L.popup({ maxWidth: 400, className: 'customPopup' })
          .setLatLng(latlng)
          .setContent(`<p>Value: ${grayIndex.toFixed(2)}, ${description}</p>`)
          .openOn(map)
      }
    }
  }

  function defineDescription(grayIndex, legends) {
    switch (true) {
      case grayIndex >= parseFloat(legends[4].quantity):
        return 'Very High'
      case grayIndex >= parseFloat(legends[3].quantity):
        return 'High'
      case grayIndex >= parseFloat(legends[2].quantity):
        return 'Medium'
      case grayIndex >= parseFloat(legends[1].quantity):
        return 'Low'
      case grayIndex >= parseFloat(legends[0].quantity):
        return 'Very Low'
      default:
        return 'No description'
    }
  }

  function createNewWMS() {
    return createElementObject(newWMSobject)
  }

  const useNewWMSelement = createElementHook(createNewWMS)
  const useNewWMS = createPathHook(useNewWMSelement)
  const NewWMS = createLeafComponent(useNewWMS)
  return <NewWMS />
}

export default BetterWMSTileLayer
