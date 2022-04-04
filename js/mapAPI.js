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
		// JavaScript Document