import {
  createElementHook,
  createElementObject,
  createLeafComponent,
  createPathHook,
} from '@react-leaflet/core';
import L from 'leaflet';

// import BetterWMSTileLayer from '../controls/BetterWMSTileLayer';

{/* <BetterWMSTileLayer url="http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms"
    layers="sdg-ai-lab:XGBoost_tuned_scaled_clipped_final"
    transparent= "true" 
    zIndex="9999"
    styles="sdg-ai-lab:xgboost"
    opacity={sv_xgboost_value / 100}
/> */}

const BetterWMS = L.TileLayer.WMS.extend({

  onAdd: function (map) {
      // Triggered when the layer is added to a map.
      //  Register a click listener, then do all the upstream WMS things
      L.TileLayer.WMS.prototype.onAdd.call(this, map);
      map.on('click', this.getFeatureInfo, this);
  },

  onRemove: function (map) {
      // Triggered when the layer is removed from a map.
      //   Unregister a click listener, then do all the upstream WMS things
      L.TileLayer.WMS.prototype.onRemove.call(this, map);
      map.off('click', this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
      // Make an AJAX request to the server and hope for the best
      let url = this.getFeatureInfoUrl(evt.latlng);
      let showResults = L.Util.bind(this.showGetFeatureInfo, this);

      fetch(url)
          .then(response => response.json())
          .then(
              (data) => {
                  const err = data.features.length > 0 ? null : data;
                  showResults(err, evt.latlng, data);
              },
              (error) => {
                  showResults(error);
              }
          )
  },

  getFeatureInfoUrl: function (latlng) {
      // Construct a GetFeatureInfo request URL given a point
      var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
          size = this._map.getSize(),

          params = {
              request: 'GetFeatureInfo',
              service: 'WMS',
              srs: 'EPSG:4326',
              styles: this.wmsParams.styles,
              transparent: this.wmsParams.transparent,
              version: this.wmsParams.version,
              format: this.wmsParams.format,
              bbox: this._map.getBounds().toBBoxString(),
              height: size.y,
              width: size.x,
              layers: this.wmsParams.layers,
              query_layers: this.wmsParams.layers,
              // info_format: 'text/html'
              info_format: 'application/json'
          };

      params[params.version === '1.3.0' ? 'i' : 'x'] = parseInt(point.x);
      params[params.version === '1.3.0' ? 'j' : 'y'] = parseInt(point.y);

      // return this._url + L.Util.getParamString(params, this._url, true);
      var url = this._url + L.Util.getParamString(params, this._url, true);

      /**
       * CORS workaround (using a basic php proxy)
       * 
       * Added 2 new options:
       *  - proxy
       *  - proxyParamName
       * 
       */

      // check if "proxy" option is defined (PS: path and file name)
      if (typeof this.wmsParams.proxy !== "undefined") {

          // check if proxyParamName is defined (instead, use default value)
          if (typeof this.wmsParams.proxyParamName !== "undefined")
              this.wmsParams.proxyParamName = 'url';

          // build proxy (es: "proxy.php?url=" )
          _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';
          url = _proxy + encodeURIComponent(url);
      }
      return url;
  },

  showGetFeatureInfo: function (err, latlng, content) {
      if (err) { console.log(err); return; }

      if (latlng && content) {
          const GRAY_INDEX = content.features[0].properties['GRAY_INDEX'];

          // Otherwise show the content in a popup, or something.
          L.popup({ maxWidth: 400, className:"customPopup"})
              .setLatLng(latlng)
              .setContent(`<p>GRAY_INDEX: ${GRAY_INDEX}</p>`)
              .openOn(this._map);
      }
  }
});

const BetterWMSTileLayer = (props) => {
  const { url, layers, transparent, zIndex, styles, opacity } = props;
  function createNewWMS() {
      return createElementObject(new BetterWMS(url, {
          layers: layers,
          transparent: transparent,
          format: 'image/png',
          version: "1.1.0",
          zIndex: zIndex,
          styles: styles,
          opacity: opacity
      }))
  }
  const useNewWMSelement = createElementHook(createNewWMS);
  const useNewWMS = createPathHook(useNewWMSelement);
  const NewWMS = createLeafComponent(useNewWMS);
  return (<NewWMS />)
}

export default BetterWMSTileLayer;