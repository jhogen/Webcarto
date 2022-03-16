function getExtentCoordinatesFromBounds(bounds) {
      return [
        bounds.getNorthWest().toArray(),
        bounds.getNorthEast().toArray(),
        bounds.getSouthEast().toArray(),
        bounds.getSouthWest().toArray()
      ];
    }
    function wmsExtent130FromBounds(bounds) {
      var sm = new SphericalMercator({
        size: 256
      });
      return [
        ...sm.forward(bounds.getSouthWest().toArray()),
        ...sm.forward(bounds.getNorthEast().toArray())
      ];
    }
    function addSingleWms(map, baseUrl) {
      return function() {
        var myCanvas = map.getCanvas();
        var myBounds = map.getBounds();
        var imageCoordinates = getExtentCoordinatesFromBounds(myBounds);
        var imageExtent3857 = wmsExtent130FromBounds(myBounds);
        if (map.getSource(sourceName) && map.getLayer(wmsLayerName)) {
            map.removeLayer(wmsLayerName);
            map.removeSource(sourceName);
        }
        var urlWms = `${baseUrl}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=topp:states&CRS=EPSG:3857&STYLES=&FORMAT_OPTIONS=dpi:180&WIDTH=${myCanvas.width / window.devicePixelRatio}&HEIGHT=${myCanvas.height / window.devicePixelRatio}&BBOX=${imageExtent3857.join(',')}`;
        map.addSource(sourceName, {
          'type': 'image',
          'url': urlWms,
          'coordinates': imageCoordinates
        });
        map.addLayer({
          'id': wmsLayerName,
          'type': 'raster',
          'source': sourceName,
          'paint': {}
        });
      }
    }
    var map = new mapboxgl.Map({
      container: 'extGeoJson',
      style: {
        "version": 8,
        "sources": {
          "raster-tiles": {
            "type": "raster",
            "tiles": ["a", "b", "c"].map(subdomain => "https://" + subdomain + ".tile.openstreetmap.org/{z}/{x}/{y}.png"),
            "tileSize": 256
          }
        },
        "layers": [{
          "id": "simple-tiles",
          "type": "raster",
          "source": "raster-tiles",
          "minzoom": 0,
          "maxzoom": 20
        }]
      },
      zoom: 8,
      center: [-103.349609, 20.659698]
    });

    var sourceName = 'wms-test-source';
    var wmsLayerName = 'wms-test-layer';
    var baseUrl = 'https://ahocevar.com/geoserver/wms';
    map.on('load', addSingleWms(map, baseUrl));
    map.on('moveend', addSingleWms(map, baseUrl));