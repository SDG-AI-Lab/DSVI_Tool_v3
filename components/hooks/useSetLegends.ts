import { useState, useEffect, useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'

type LegendType = {
  color: string
  label: string
  opacity: string
  quantity: string
}

export const useSetLegends = (geoServerUrl: string, layers: string): void => {
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
