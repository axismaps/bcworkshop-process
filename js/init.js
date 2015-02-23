var map,
	neighborhoods,
	endpoint = window.location.origin + ':3000';

function init(){
	init_map();
	init_events();
	init_names();
	resize();
}

function init_map(){
	//Initializing map and tile layer
	map = L.map( 'map', { 
		zoomControl: false,
		minZoom : 10,
		maxBounds : [ [ 32.5, -96.55 ], [ 33.05, -97.05 ] ]
	}).setView( [ 32.78, -96.8 ], 11 );
	L.tileLayer( tileAddress ).addTo( map );

	//loading neighborhood topojson
	var layerStyle = L.geoJson( null, {
		style : function( feature ) {
			return { 
				color : '#000',
				weight : 2
			};
    		},
    		onEachFeature : function( feature, layer ) {
	    		layer.on({
				mouseover : highlightFeature,
				mouseout : resetHighlight,
				click : featureClick
			});
    		}
	});
		
	neighborhoods = omnivore.topojson( endpoint + "/neighborhoods", null, layerStyle ).addTo( map );
}

function highlightFeature( e ) {
	var layer = e.target;
	
	layer.setStyle({
        color : '#f00'
    });
    
	show_probe( e, layer.feature.properties.name );
}

function resetHighlight( e ) {
	neighborhoods.resetStyle( e.target );
	$( "#probe" ).hide();
}

function featureClick( e ) {
	show_details( e.target.feature.properties );
}

function init_events(){	
	$( window ).resize( resize );
	
	$( "#zoom-out" ).click( function(){
		map.zoomOut();
		if( map.getZoom() - 1 <= map.getMinZoom() ) $( "#zoom-out" ).addClass( "disabled" );
		$( "#zoom-in" ).removeClass( "disabled" );
	});
	$( "#zoom-in" ).click( function() {
		map.zoomIn();
		if( map.getZoom() + 1 >= map.getMaxZoom() ) $( "#zoom-in" ).addClass( "disabled" );
		$( "#zoom-out" ).removeClass( "disabled" );
	});
}

function init_names() {
	var names = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace( 'name' ),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		limit : 4,
		prefetch : {
			url : endpoint + '/names',
			filter : function( list ) {
				return $.map( list, function( neighborhood ){ return { name : neighborhood }; });
    			}
		}
	});
	
	names.initialize();
	
	$( '#name-input' ).typeahead(null, {
		name : 'neighborhoods',
		displayKey : 'name',
		source : names.ttAdapter()
	});
}

function resize(){
	$( "aside, #map" ).height( $( window ).height() - 140 );
	map.invalidateSize();
}

init();
