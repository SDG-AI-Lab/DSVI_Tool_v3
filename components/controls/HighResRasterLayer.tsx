import L from 'leaflet'
import { useContext, useEffect, useRef } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'
import { useRouter } from 'next/router'
import { FilterContext } from '../../context/FilterContext'

// Written by scripts/prepare_high_res_layers.py
type RasterMeta = {
  width: number
  height: number
  bounds: [number, number, number, number] // west, south, east, north
  offset: number
  scale: number
  nodata: number
  breaks: number[]
}

type Raster = {
  meta: RasterMeta
  grid: Uint16Array
  imageUrl: string
}

interface HighResRasterLayerProps {
  slug: string
  title: string
  colors: string[]
  opacity: number
}

const classNames = ['Very Low', 'Low', 'Middle', 'High', 'Very High']

// Loaded rasters are kept, so switching a layer on again needs no new requests
const rasterCache: { [url: string]: Promise<Raster> } = {}

const fetchGrid = async (url: string): Promise<Uint16Array> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  let buffer = await res.arrayBuffer()
  const head = new Uint8Array(buffer.slice(0, 2))
  // Skip if the server already decompressed it (Content-Encoding: gzip)
  if (head[0] === 0x1f && head[1] === 0x8b) {
    // any: the TypeScript 4.5 DOM types lack pipeThrough and DecompressionStream
    const stream = (new Blob([buffer]).stream() as any).pipeThrough(
      new (window as any).DecompressionStream('gzip')
    )
    buffer = await new Response(stream).arrayBuffer()
  }
  return new Uint16Array(buffer)
}

const classOf = (value: number, breaks: number[]): number => {
  let index = 0
  for (let i = 1; i < breaks.length; i++) {
    if (value >= breaks[i]) index = i
  }
  return index
}

const hexToRgb = (hex: string): number[] =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

const mercatorY = (lat: number): number =>
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))

// Leaflet stretches image overlays linearly in Web Mercator, but the rasters
// have equal steps in latitude, so rows are resampled to Mercator here.
const renderImage = (
  meta: RasterMeta,
  grid: Uint16Array,
  colors: string[]
): Promise<string> => {
  const { width, height, bounds, offset, scale, nodata, breaks } = meta
  const [, south, , north] = bounds
  const yNorth = mercatorY(north)
  const ySouth = mercatorY(south)
  const outHeight = Math.round(
    (height * (yNorth - ySouth)) / (((north - south) * Math.PI) / 180)
  )

  const rgb = colors.map(hexToRgb)
  const classOfQ = new Uint8Array(nodata)
  for (let q = 0; q < nodata; q++) {
    classOfQ[q] = classOf(offset + q * scale, breaks)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = outHeight
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(width, outHeight)
  const pixels = image.data

  for (let j = 0; j < outHeight; j++) {
    const y = yNorth - ((j + 0.5) * (yNorth - ySouth)) / outHeight
    const lat = (Math.atan(Math.exp(y)) * 360) / Math.PI - 90
    const row = Math.min(
      height - 1,
      Math.floor(((north - lat) / (north - south)) * height)
    )
    for (let i = 0; i < width; i++) {
      const q = grid[row * width + i]
      if (q === nodata) continue
      const color = rgb[classOfQ[q]]
      const k = (j * width + i) * 4
      pixels[k] = color[0]
      pixels[k + 1] = color[1]
      pixels[k + 2] = color[2]
      pixels[k + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)))
  )
}

const loadRaster = (
  basePath: string,
  slug: string,
  colors: string[]
): Promise<Raster> => {
  const url = `${basePath}/static/tajikistan/high_res/${slug}`
  if (!rasterCache[url]) {
    rasterCache[url] = (async () => {
      const res = await fetch(`${url}.json`)
      if (!res.ok) throw new Error(`${res.status} ${url}.json`)
      const meta: RasterMeta = await res.json()
      const grid = await fetchGrid(`${url}.bin.gz`)
      const imageUrl = await renderImage(meta, grid, colors)
      return { meta, grid, imageUrl }
    })()
    // Allow a retry next time the layer is switched on
    rasterCache[url].catch(() => delete rasterCache[url])
  }
  return rasterCache[url]
}

const HighResRasterLayer = ({
  slug,
  title,
  colors,
  opacity,
}: HighResRasterLayerProps) => {
  const { dispatch } = useContext(FilterContext)
  const { basePath } = useRouter()
  const map = useMap()
  const overlayRef = useRef<L.ImageOverlay | null>(null)
  const rasterRef = useRef<Raster | null>(null)
  const opacityRef = useRef(opacity)
  opacityRef.current = opacity

  useEffect(() => {
    let cancelled = false

    loadRaster(basePath, slug, colors).then(
      (raster) => {
        if (cancelled) return
        const [west, south, east, north] = raster.meta.bounds
        rasterRef.current = raster
        overlayRef.current = L.imageOverlay(
          raster.imageUrl,
          L.latLngBounds([south, west], [north, east]),
          { pane: 'geodata-pane', opacity: opacityRef.current }
        ).addTo(map)

        dispatch({
          type: 'CHANGE_GEOLAYERS_DESCRIPTION',
          layer: slug,
          payload: raster.meta.breaks.map((quantity, i) => ({
            color: colors[i],
            label: classNames[i],
            quantity: String(quantity),
            opacity: '1',
          })),
        })
      },
      (error) => console.error(`High res layer ${slug}:`, error)
    )

    return () => {
      cancelled = true
      overlayRef.current?.remove()
      overlayRef.current = null
      rasterRef.current = null
    }
  }, [basePath, slug])

  useEffect(() => {
    overlayRef.current?.setOpacity(opacity)
  }, [opacity])

  useMapEvents({
    click(evt) {
      const raster = rasterRef.current
      if (!raster) return
      const { width, height, bounds, offset, scale, nodata, breaks } =
        raster.meta
      const [west, south, east, north] = bounds
      const col = Math.floor(((evt.latlng.lng - west) / (east - west)) * width)
      const row = Math.floor(
        ((north - evt.latlng.lat) / (north - south)) * height
      )
      const inside = col >= 0 && col < width && row >= 0 && row < height
      const q = inside ? raster.grid[row * width + col] : nodata

      let content = `<b>${title}</b><br/>no data`
      if (q !== nodata) {
        const value = offset + q * scale
        content = `<b>${title}</b><br/>Value: ${value.toFixed(2)}, ${
          classNames[classOf(value, breaks)]
        }`
      }
      L.popup({ maxWidth: 400, className: 'customPopup' })
        .setLatLng(evt.latlng)
        .setContent(content)
        .openOn(map)
    },
  })

  return null
}

export default HighResRasterLayer
