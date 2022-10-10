/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  basePath: isDev ? '': '/DSVI_Tool_v3',
  assetPrefix: isDev ? '': '/DSVI_Tool_v3/',
  images: {
    loader: 'akamai',
    path: '',
    domains: ['https://server.arcgisonline.com'],
  },
  env:{
    mapbox_token:'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  },
  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.geojson$/,
      loader: 'json-loader'
    });

    // Important: return the modified config
    return config
  },
}
