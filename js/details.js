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

function show_details( properties ) {
	$( "body" ).addClass( "details" );
	$( "aside" )
		.empty()
		.append( "<h2>" + properties.name + "</h2>" );
	
	$.ajax( endpoint + '/names/description/' + properties.id, {
		success : function( data ) {
			$( "aside" ).append( '<p><i>' + data[ 0 ].description + '</i></p>' );
			
			$.ajax( endpoint + '/services/' + properties.id, {
				success : function( data ) {
					_.each( data, function( item ) {
						$div = $( '<div class="service"><h3><span class="glyphicon glyphicon-tree-deciduous"></span> Organization</h3></div>' ).appendTo( $( "aside" ) );
						$div.append( '<h4>' + item.name + '</h4>' );
						if( item.contact ) $div.append( '<h5>Contact person:</h5><p>' + item.contact + '</p>' );
						if( item.email ) $div.append( '<h5>Email:</h5><p><a href="mailto:' + item.email + '">' + item.email + '</a></p>' );
						if( item.phone ) $div.append( '<h5>Phone:</h5><p>' + item.phone + '</p>' );
						if( item.url ) $div.append( '<p><a href="' + item.url + '" target="_blank">Website</a></p>' );
					})
				}
			})
		}
	})
}
