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
	$( "body" ).addClass( "details" );
	$( "aside" ).empty();
	$( "#selected p" ).text( properties.name );
	
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
