var mapAPI = L.map('mapAPI').setView([52.356249,5.620991], 7);
	
	L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
 }).addTo(mapAPI);
		 
		 
  const geoJsonLayer = L.geoJson().addTo(mapAPI);

    function zoomOnClick() {
      mapAPI.setView( [52.356249,5.620991], 11)

      fetch('https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=gem-f62e7c1f70b07988ba1715f232fe6fbe&fl=*')
        .then(response => response.json())
        .then(data => {
          const wkt = data.response.docs[0].geometrie_ll
		  
          const geojson = Terraformer.wktToGeoJSON(wkt)
          console.log(geojson)
          geoJsonLayer.addData(geojson)
        })
    }
	

  const wfsLayer = new L.geoJson();

	wfsLayer.addTo(mapAPI);

	fetch('https://geoservices.rijkswaterstaat.nl/arcgis2/rest/services/GDR/kerngis_droog/MapServer/30/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson', {})
		.then(response => response.json())
		.then(data => {
			wfsLayer.addData(data);
	});

