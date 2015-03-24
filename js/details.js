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
	$( "#selected" ).text( properties.name );
	$.ajax( endpoint + '/template', {
		data : { json : JSON.stringify( template ), id : properties.id },
		dataType : 'html',
		type : "POST",
		success : function( html ) {
			$( "aside" ).append( html );
			if( executing ) executing.removeData( 'executing' );
		}
	})
}
