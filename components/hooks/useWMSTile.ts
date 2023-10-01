import { useState, useEffect, useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'

export type LegendType = {
  color: string
  label: string
  opacity: string
  quantity: string
}

export const useWMSTile = () => {
  const addLegends = (geoServerUrl: string, layers: string) => {
    const { state, dispatch } = useContext(FilterContext)

    const [legends, setLegends] = useState<LegendType[]>([])

    let legend_url = `${geoServerUrl}?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&FORMAT=application/json&LAYER=${layers}`
    useEffect(() => {
      fetch(legend_url)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result) {
              let newLegends: LegendType[] =
                result.Legend[0].rules[0].symbolizers[0].Raster.colormap.entries
              const lastIdx = newLegends.length - 1

              const fiveFractions = [0, 0.25, 0.5, 0.75, 1]
              const fiveLegends = fiveFractions.map((frac) => {
                const idx = Math.floor(frac * lastIdx)
                return newLegends[idx]
              })

              setLegends(fiveLegends)
              dispatch({
                type: 'CHANGE_GEOLAYERS_DESCRIPTION',
                layer: layers,
                payload: fiveLegends,
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
        setLegends([])
      }
    }, [])
  }

  // const addToolTip = () => {
  //   useMapEvents({
  //     click(evt) {
  //       getFeatureInfo(evt, layers)
  //     },
  //   })

  //   const { geolayers_description } = state
  //   const geolayersArr = Object.values(geolayers_description)
  //   const last = geolayersArr.length - 1
  //   const legends = geolayersArr[last]

  //   function getFeatureInfo(evt, layers) {
  //     // Make an AJAX request to the server and hope for the best
  //     let url = getFeatureInfoUrl(evt.latlng)
  //     let legend_url = `https://www.sdglab.ml/geoserver/sdg-ai-lab/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&FORMAT=application/json&LAYER=${layers}`

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then(
  //         (data) => {
  //           // const err = data.features.length > 0 ? null : data
  //           console.log('in then')
  //           showGetFeatureInfo(evt.latlng, data, legends)
  //         },
  //         (error) => {
  //           showGetFeatureInfo(error)
  //         }
  //       )
  //   }

  //   function getFeatureInfoUrl(latlng) {
  //     // Construct a GetFeatureInfo request URL given a point
  //     const point = map.latLngToContainerPoint(latlng, map.getZoom())
  //     const size = map.getSize()

  //     let params = {
  //       request: 'GetFeatureInfo',
  //       service: 'WMS',
  //       srs: 'EPSG:4326',
  //       styles,
  //       transparent: true,
  //       version,
  //       format,
  //       bbox: map.getBounds().toBBoxString(),
  //       height: size.y,
  //       width: size.x,
  //       layers,
  //       query_layers: layers,
  //       info_format: 'application/json',
  //     }

  //     params[params.version === '1.3.0' ? 'i' : 'x'] = parseInt(point.x)
  //     params[params.version === '1.3.0' ? 'j' : 'y'] = parseInt(point.y)

  //     let updated_url = url + L.Util.getParamString(params, url, true)

  //     // COMMENT #1 WAS HERE

  //     return updated_url
  //   }

  //   function showGetFeatureInfo(latlng, data, legends) {
  //     if (latlng && data) {
  //       const grayIndex =
  //         data.features.length && data.features[0].properties['GRAY_INDEX']
  //       const description = defineDescription(grayIndex, legends)
  //       let content = grayIndex
  //         ? `<p>Value: ${grayIndex.toFixed(2)}, ${description}</p>`
  //         : 'no data'

  //       if (grayIndex != -1 && description != 'No description') {
  //         // Otherwise show the content in a popup, or something.
  //         L.popup({ maxWidth: 400, className: 'customPopup' })
  //           .setLatLng(latlng)
  //           .setContent(content)
  //           .openOn(map)
  //       }
  //     }
  //   }

  //   function defineDescription(grayIndex, legends) {
  //     switch (true) {
  //       case grayIndex >= parseFloat(legends[4].quantity):
  //         return 'Very High'
  //       case grayIndex >= parseFloat(legends[3].quantity):
  //         return 'High'
  //       case grayIndex >= parseFloat(legends[2].quantity):
  //         return 'Medium'
  //       case grayIndex >= parseFloat(legends[1].quantity):
  //         return 'Low'
  //       case grayIndex >= parseFloat(legends[0].quantity):
  //         return 'Very Low'
  //       default:
  //         return 'No description'
  //     }
  //   }
  // }

  return { addLegends }
}
