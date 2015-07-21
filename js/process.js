function load_process_boundaries( properties, executing ){
	if( typeof process_neighborhoods != "undefined" ) map.removeLayer( process_neighborhoods );
	
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
  
  var processStyle = L.geoJson( null, {
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
        },
        mouseout : function( e ) {
          if( $.isEmptyObject( selected ) || e.target.feature.properties.id != selected.feature.properties.id ) process_neighborhoods.resetStyle( e.target );
        }
      });
    }  
  });
  
	process_neighborhoods = omnivore.topojson( endpoint + "/process/" + properties.id, null, processStyle )
		.on( 'ready', function() {
			faded = true
			neighborhoods.setStyle({
				opacity : '.2',
				fillOpacity : '.08'
			});
			map.fitBounds( process_neighborhoods.getBounds() );
		})
		.addTo( map );
}

function reset_process() {	
	var pan_offset = $( "body" ).hasClass( "details" );
	$( "body" ).removeClass( "details" );
	resize();
	$( "aside" ).empty();
	
	map.removeLayer( process_neighborhoods );
	selected = {};
	
	neighborhoods.setStyle({
		opacity : '.5',
		fillOpacity : '.2'
	})
	faded = false;
}