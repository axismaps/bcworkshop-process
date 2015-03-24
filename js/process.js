function load_process_boundaries( properties, executing ){
	// console.log( properties );
	
	var layerStyle = L.geoJson( null, {
		style : function( feature ) {
			return { 
				color : '#000',
				weight : 2,
				fillOpacity : '.05'
			};
    	},
    	onEachFeature : function( feature, layer ) {
	    	layer.on({
				mouseover : highlightFeature,
				mouseout : resetHighlight
			});
    	}
	});
	
	process_neighborhoods = omnivore.topojson( endpoint + "/process/" + properties.id, null, layerStyle )
		.on( 'ready', function() {
			map.removeLayer( neighborhoods );
		})
		.addTo( map );
}