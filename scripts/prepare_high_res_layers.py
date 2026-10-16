"""
Convert the High Res. GeoTIFFs (from the DSVI_Tajikistan repo) into small static
files the map can load straight from GitHub Pages, replacing the old GeoServer.

For every layer it writes, into public/static/tajikistan/high_res/:
  <slug>.bin.gz  gzipped uint16 grid (little endian, row-major, north to south),
                 value = offset + q * scale, q == 65535 means no data
  <slug>.json    grid size, bounds, quantization and the 5 legend breaks

Usage:
  python scripts/prepare_high_res_layers.py --src ../DSVI_Tajikistan/Data
"""

import argparse
import gzip
import json
import os

import numpy as np
import rasterio
from rasterio.features import geometry_mask

NODATA_Q = 65535

# slug -> GeoTIFF path relative to the DSVI_Tajikistan/Data folder
LAYERS = {
    'sv_xgboost': 'predictions/XGBoost_tuned_scaled_clipped_final.tif',
    'sv_random_forest': 'predictions/Random_Forest_tuned_scaled_clp_final.tif',
    'sv_nightlight_intensity': 'raster_inputs/high/r_norm_NTL.tif',
    'sv_pop_density': 'raster_inputs/high/r_norm_pop.tif',
    'sv_celltower': 'raster_inputs/high/r_norm_cellt.tif',
    'sv_relative_wealth': 'raster_inputs/high/up_rwi.tif',
    'sv_gdp': 'raster_inputs/high/r_norm_GDP_2015_intp.tif',
    'sv_distance_to_healthcare': 'raster_inputs/high/r_norm_health_dd_spd_10k.tif',
    'sv_distance_to_finance': 'raster_inputs/high/r_norm_finan_dd_spd_10k_4326.tif',
    'sv_distance_to_edu': 'raster_inputs/high/r_norm_edu_dd_spd_10k_4326.tif',
    'sv_road_density': 'raster_inputs/high/r_norm_road_density.tif',
    'sv_elevation': 'raster_inputs/high/r_norm_DEM_Large.tif',
    'sv_slope': 'raster_inputs/high/r_norm_slope.tif',
    'sv_max_temp': 'raster_inputs/high/r_norm_maxtemp_feb.tif',
    'sv_plant_health': 'raster_inputs/high/r_norm_NDVI.tif',
    'sv_precipitation': 'raster_inputs/high/up_rainfall.tif',
}


def legend_breaks(values):
    """Lower bounds of 5 equal-count classes (quintiles).

    Layers that are mostly zero (nightlights, GDP, population...) would get
    identical quintiles, so for those the first class holds the minimum and the
    other 4 are quintiles of the remaining values.
    """
    vmin = float(values.min())
    breaks = np.percentile(values, [0, 20, 40, 60, 80])
    if len(np.unique(breaks)) < 5:
        rest = values[values > vmin]
        breaks = [vmin] + list(np.percentile(rest, [0, 25, 50, 75]))
    return [float(b) for b in breaks]


def convert(slug, tif_path, aoi_geoms, out_dir):
    with rasterio.open(tif_path) as src:
        data = src.read(1).astype('float64')
        valid = np.isfinite(data)
        if src.nodata is not None:
            valid &= data != src.nodata
        valid &= ~geometry_mask(
            aoi_geoms, out_shape=data.shape, transform=src.transform
        )
        west, south, east, north = src.bounds
        width, height = src.width, src.height

    values = data[valid]
    vmin, vmax = float(values.min()), float(values.max())
    scale = (vmax - vmin) / (NODATA_Q - 1) or 1.0

    q = np.full(data.shape, NODATA_Q, dtype='<u2')
    q[valid] = np.clip(np.round((values - vmin) / scale), 0, NODATA_Q - 1)

    # mtime=0 keeps the output identical between runs
    with open(os.path.join(out_dir, f'{slug}.bin.gz'), 'wb') as f:
        f.write(gzip.compress(q.tobytes(), 9, mtime=0))

    meta = {
        'width': width,
        'height': height,
        'bounds': [west, south, east, north],
        'offset': vmin,
        'scale': scale,
        'nodata': NODATA_Q,
        'min': vmin,
        'max': vmax,
        'breaks': legend_breaks(values),
        'source': os.path.basename(tif_path),
    }
    with open(os.path.join(out_dir, f'{slug}.json'), 'w') as f:
        json.dump(meta, f, indent=2)
    return meta


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='DSVI_Tajikistan/Data folder')
    parser.add_argument(
        '--aoi',
        default=os.path.join(root, 'public', 'static', 'AOI.geojson'),
        help='country outline used to mask the rasters',
    )
    args = parser.parse_args()

    out_dir = os.path.join(root, 'public', 'static', 'tajikistan', 'high_res')
    os.makedirs(out_dir, exist_ok=True)

    with open(args.aoi) as f:
        aoi_geoms = [feat['geometry'] for feat in json.load(f)['features']]

    for slug, rel_path in LAYERS.items():
        meta = convert(slug, os.path.join(args.src, rel_path), aoi_geoms, out_dir)
        size = os.path.getsize(os.path.join(out_dir, f'{slug}.bin.gz'))
        print(
            f"{slug:28s} {meta['width']}x{meta['height']} "
            f"{size / 1e6:5.2f} MB  breaks={[round(b, 3) for b in meta['breaks']]}"
        )


if __name__ == '__main__':
    main()
