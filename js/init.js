var map,
	neighborhoods,
	template,
	selected = {},
	endpoint = window.location.origin + ':3000';

function init(){
	init_map();
	init_layers( $( ".dropdown-menu" ) );
	init_events();
	init_names();
	resize();
}

function init_map(){
	//Initializing map and tile layer
	map = L.map( 'map', { 
		zoomControl: false,
		minZoom : 10,
		keyboard : false
	}).setView( [ 32.78, -96.8 ], 11 );
	L.tileLayer( tileAddress ).addTo( map );
	
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
	
	//fire intro screen
	$( '#about' ).modal({
		backdrop: 'static',
		keyboard: false
	}).modal( 'show' );
	$( '#about #loading-icon').show();
	$( '#about .close').hide();
		
	neighborhoods = omnivore.topojson( endpoint + "/topojson/neighborhoods/id%2Cname%2Carea/", null, layerStyle )
		.on( 'ready', function() {
			//sets the maxBounds to the neighborhood bounds + 0.1%
			map.setMaxBounds( neighborhoods.getBounds().pad( .2 ) );
			
			var mdl = $( '#about' ).data( 'bs.modal' );
			mdl.options.backdrop = true;
			mdl.options.keyboard = true;
			mdl.escape();
			$( '#about #loading-icon').hide();
			$( '#about .close').show();
		})
		.addTo( map );
		
	
}

function highlightFeature( e ) {
	var layer = e.target;
	
	layer.setStyle({
        color : '#ed2a24'
    });
    
	show_probe( e, layer.feature.properties.name );
}

function resetHighlight( e ) {
	if( $.isEmptyObject( selected ) || e.target.feature.properties.id != selected.feature.properties.id ) neighborhoods.resetStyle( e.target );
	$( "#probe" ).hide();
}

function featureClick( e ) {
	var executing = $( this );
	if ( executing.data( 'executing' ) ) return;
	executing.data( 'executing', true );
	
	if( $.isEmptyObject( selected ) || e.target.feature.properties.id != selected.feature.properties.id ) {
		neighborhoods.resetStyle( selected );
		$( '#name-input' ).val('');
	}
	selected = e.target;
	selected.setStyle({
		color : '#ed2a24'
	});
	show_details( e.target.feature.properties, executing );
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
	keyboard_events();
}

function init_names() {
	var names = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace( 'name' ),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		limit : 4,
		prefetch : {
			url : endpoint + '/names'
		}
	});
	names.initialize();
	
	$( '#name-input' )
		.typeahead( null, {
			name : 'neighborhoods',
			displayKey : 'name',
			source : names.ttAdapter()
		})
		.on( 'typeahead:selected', function( e, obj ) {
			newFeature = get_feature( obj.id );
			map.fitBounds( newFeature.getBounds() );
			newFeature.setStyle({
				color : '#ed2a24'
			});
			if ( selected ) neighborhoods.resetStyle( selected );
			selected = newFeature;
			show_details( obj );
			$( '#name-input' ).blur();
		})
}

function get_feature( id ) {
	return _.find( neighborhoods.getLayers(), function( l ) {
		return id == l.feature.properties.id;
	})
}

function resize(){
	$( "#map" ).height( $( window ).height() - 140 );
	$( "aside" ).height( $( window ).height() - 200 );
	map.invalidateSize();
}

init();
