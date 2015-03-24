var selected;

function show_probe( e, text ) {
	$( "#probe" )
		.show()
		.text( text )
		.css({
			left : e.originalEvent.clientX,
			top : e.originalEvent.clientY
		})
}

function show_details( properties, executing ) {
	var pan_offset = !$( "body" ).hasClass( "details" );
	$( "body" ).addClass( "details" );
	resize();
	if ( pan_offset ) map.panBy([ $( "aside" ).outerWidth()/2, 0 ],{animate:false});
	$( "aside" ).empty();
	$( "#selected p" ).text( properties.name );
	
	html = '<div id="aside-loading">' +
			'<i class="fa fa-spinner fa-pulse fa-3x"></i>' +
			"<p>Loading Neighborhood Details</p>" +
			'</div>';
	$( "aside" ).html( html );
	
	$.ajax( endpoint + '/template', {
		data : { json : JSON.stringify( template ), id : properties.id },
		dataType : 'html',
		type : "POST",
		success : function( html ) {
			$( "aside" ).empty();
			$( "aside" ).append( html );
			if( executing ) executing.removeData( 'executing' );
		}
	})
}
