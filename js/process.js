function load_process_boundaries( properties, executing ){
	// console.log( properties );
	
	var layerStyle = L.geoJson( null, {
		style : function( feature ) {
			return { 
				color : '#ed2a24',
				weight : 2,
				opacity : '.05',
				fillColor : '#ed2a24',
				fillOpacity : '.02'
			};
    	},
    	onEachFeature : function( feature, layer ) {
	    	layer.on({
				mouseover : function( e ) {	
					e.target.setStyle({
						opacity : '1',
						fillOpacity : '.3'
					});
					
					show_probe( e, e.target.feature.properties.name );
				},
				mouseout : function( e ) {
					if( $.isEmptyObject( selected ) || e.target.feature.properties.id != selected.feature.properties.id ) process_neighborhoods.resetStyle( e.target );
					$( "#probe" ).hide();
				}
			});
    	}
	});
	
	process_neighborhoods = omnivore.topojson( endpoint + "/process/" + properties.id, null, layerStyle )
		.on( 'ready', function() {
			map.removeLayer( neighborhoods );
		})
		.addTo( map );
}